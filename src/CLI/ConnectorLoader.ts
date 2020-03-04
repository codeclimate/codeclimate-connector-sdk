import { resolve } from "path";
import { cwd } from "process";
import { existsSync, readFileSync } from "fs";

import { ClientConfiguration, ClientInterface } from "../Client"
import { Logger } from "../Logger"
import { RecordProducer, RecordProducerFacade } from "../RecordProducer"
import { State, StateManager } from "../StateManager"

export class ConnectorLoader {
  constructor(public connectorSlug: string, public clientConfiguration: ClientConfiguration, public logger: Logger) {
  }

  public buildClient(): ClientInterface {
    const clientKlass = this.requiredClientLib().Client

    return new clientKlass(
      this.clientConfiguration,
      this.buildRecordProducer(),
      this.buildStateManager(),
      this.logger.taggedChild([this.connectorSlug]),
    )
  }

  private buildRecordProducer(): RecordProducer {
    return new RecordProducerFacade(
      {
        produce: (envelope) => {
          this.logger.info(`Produced record: ${JSON.stringify(envelope.record, null, "  ")}`)
        }
      }
    )
  }

  private buildStateManager() {
    let state: State | null = null
    const manager: StateManager = {
      get: () => state,
      set: (newState) => {
        this.logger.info(`Set state: ${JSON.stringify(newState, null, "  ")}`)
        state = newState
      }
    }

    return manager
  }

  // When you are *inside* a project directory for a package named "foo", you
  // cannot typically `require("foo")`.
  // So we naively try to require the given library (so this can be run from
  // like a global install), but for the case where this is being run within a
  // connector's project directory, we look for a `package.json`, resolve the
  // appropriate include to an absolute path, and require that.
  private requiredClientLib(): { Client: any } {
    const packageName = `codeclimate-connector-${this.connectorSlug}`
    try {
      return require(packageName)
    } catch(ex) {
      if(ex.code === "MODULE_NOT_FOUND" && existsSync("package.json")) {
        const packageSpec = JSON.parse(readFileSync("package.json").toString())
        if (packageSpec["name"] === packageName) {
          let reqPath = resolve(
            cwd(),
            packageSpec["main"] || "index.js",
          )
          return require(reqPath)
        } else {
          throw ex
        }
      } else {
        throw ex
      }
    }
  }
}
