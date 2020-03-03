import * as Ajv from "ajv";
import { resolve } from "path";
import { readFileSync, readdirSync } from "fs";

const schemaDirPath = resolve(__dirname, "../schemas/")

export class RecordValidator {
  private _ajv: Ajv.Ajv | null = null
  private _isValid: boolean | null = null

  constructor(public record: object) {
  }

  get isValid(): boolean {
    this.validate()

    return this._isValid as boolean
  }

  get errors(): string[] {
    this.validate()

    if (!this.isValidType) {
      if(!this.record["_type"]) {
        return ["missing required attribute \"_type\""]
      } else {
        return [`"${this.record["_type"]}" is not a recognized record type`]
      }
    }

    let sourceErrs = this.ajv.errors || []

    if (!sourceErrs.every((e) => e.dataPath === "")) {
      sourceErrs = sourceErrs.filter((e) => e.dataPath !== "")
    }

    return sourceErrs.map((e) => {
      let p = e.params

      if (p["missingProperty"]) {
        return `${e.dataPath} missing required attribute "${p["missingProperty"]}"`
      } else if (p["allowedValue"]) {
        return `${e.dataPath} must be "${p["allowedValue"]}"`
      } else if (p["allowedValues"]) {
        return `${e.dataPath} must be one of ${p["allowedValues"].map((o) => `"${o}"`).join(", ")}`
      } else if (p["format"]) {
        return `${e.dataPath} must match format "${p["format"]}"`
      } else {
        return `${e.dataPath} ${e.message}`
      }
    })
  }

  private get schemaPaths(): string[] {
    return readdirSync(schemaDirPath).filter((path) => {
      return /\.schema\.json$/.test(path)
    })
  }

  private get ajv(): Ajv.Ajv {
    if (!this._ajv) {
      this._ajv = new Ajv({ allErrors: true })
      this.schemaPaths.forEach((path) => {
        this._ajv!.addSchema(JSON.parse(
          readFileSync(
            resolve(schemaDirPath, path)
          ).toString()
        ))
      })
    }

    return this._ajv
  }

  // record types are FooBar, keys in the json schema defs are fooBar
  private get recordTypeDasherize(): string {
    const t = this.record["_type"] || "MissingType"
    const initalDowned = `${t[0].toLowerCase()}${t.slice(1)}`
    return initalDowned.replace(/([a-z])([A-Z])/, (_m, l, r) => {
      return `${l}-${r.toLowerCase()}`
    })
  }

  private get recordSchemaRef(): string {
    return `https://platform.codeclimate.com/schemas/${this.recordTypeDasherize}`
  }

  private get isValidType(): boolean {
    if (!this.record["_type"]) {
      return false
    }

    return undefined !== this.ajv.getSchema(this.recordSchemaRef)
  }

  private validate() {
    if (this._isValid === null) {
      // short-circuit if no type/schema found
      if (!this.isValidType) {
        this._isValid = false
        return
      }

      this._isValid = this.ajv.validate(
        this.recordSchemaRef,
        this.record,
      ) as boolean
    }
  }
}
