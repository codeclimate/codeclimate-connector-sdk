import { RecordValidator } from "./RecordValidator"

interface StreamRecord {
  _type: string
  id: string
  self: string
  name: string
  htmlUrl?: string
}

export class Stream {
  public record: StreamRecord

  constructor(record: object) {
    if (record["_type"] !== "Stream") {
      throw `This doesn't look like a Stream record: ${JSON.stringify(record)}`
    }

    const validator = new RecordValidator(record)
    if (!validator.isValid) {
      throw `This stream record isn't valid: ${validator.errors}`
    }

    this.record = record as StreamRecord
  }

  public get id(): string {
    return this.record.id
  }

  public get name(): string {
    return this.record.name
  }

  public get htmlUrl(): string | undefined {
    return this.record.htmlUrl
  }

  public get self(): string {
    return this.record.self
  }
}
