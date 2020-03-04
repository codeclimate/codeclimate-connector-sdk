import { Logger, LoggerConfig } from "../Logger"
import { RecordProducerFacade } from "../RecordProducer"
import { State, StateManager } from "../StateManager"

export class FakeLoggerIO {
  messages: string[] = []

  public write(msg) {
    this.messages.push(msg)
  }
}

export class FakeLogger extends Logger {
  constructor(config?: LoggerConfig) {
    super(new FakeLoggerIO(), config)
  }

  public get messages() {
    return (this.io as FakeLoggerIO).messages
  }
}

export class FakeRecordProducerFacade extends RecordProducerFacade  {
  private _records: object[] = []

  constructor() {
    super({
      produce: (envelope) => this._records.push(envelope.record)
    })
  }

  public get records() {
    return this._records
  }
}

export class FakeStateManager implements StateManager {
  private state: State | null = null

  constructor() {
  }

  get() {
    return this.state
  }

  set(newState: State) {
    this.state = newState
  }
}

export function buildFakeStateManager(): FakeStateManager {
  return new FakeStateManager()
}

export function buildFakeLogger(): FakeLogger {
  return new FakeLogger()
}

export function buildFakeRecordProducer(): FakeRecordProducerFacade {
  return new FakeRecordProducerFacade()
}
