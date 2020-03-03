import { RecordValidator } from "../RecordValidator"

describe(RecordValidator, () => {
  describe("Incident records", () => {
    test("is not valid with missing attrs", () => {
      const record = {
        _type: "Incident",
        id: "a1b2c3",
        self: "http://example.com",
        title: "an incident"
      }
      const validator = new RecordValidator(record)

      expect(validator.isValid).toBe(false)
      expect(validator.errors.length).toBe(2)
      expect(validator.errors[0]).toMatch(/required attribute "status"/)
    })

    test("is not valid with incorrectly formatted attrs", () => {
      const record = {
        _type: "Incident",
        id: "a1b2c3",
        self: "http://example.com/incident/42",
        title: "an incident",
        htmlUrl: "not-a-url",
        number: 42,
        status: "not-a-status",
        createdAt: "not-a-time"
      }
      const validator = new RecordValidator(record)

      expect(validator.isValid).toBe(false)
      expect(validator.errors.length).toBe(3)
      expect(validator.errors[0]).toMatch(/htmlUrl.*must match format/)
      expect(validator.errors[1]).toMatch(/status.*must be one of.*triggered/)
      expect(validator.errors[2]).toMatch(/createdAt.*must match format/)
    })

    test("is valid", () => {
      const record = {
        _type: "Incident",
        id: "a1b2c3",
        self: "http://example.com/incident/42",
        title: "an incident",
        htmlUrl: "http://example.com",
        number: 42,
        status: "acknowledged",
        createdAt: "2020-02-21 12:00:00Z"
      }
      const validator = new RecordValidator(record)

      expect(validator.isValid).toBe(true)
    })
  })

  describe("Stream records", () => {
    test("is not valid without required keys", () => {
      const record = {
        _type: "Stream",
        name: "your stream",
      }
      const validator = new RecordValidator(record)

      expect(validator.isValid).toBe(false)
    })

    test("is valid without optional keys", () => {
      const record = {
        _type: "Stream",
        id: "a1b2c3",
        self: "yourschema://some-id",
        name: "your stream",
      }
      const validator = new RecordValidator(record)

      expect(validator.isValid).toBe(true)
    })
  })

  describe("CoverageTotals records", () => {
    test("is valid with a repository URI", () => {
      const record = {
        _type: "CoverageTotals",
        self: "http://example.com/test-coverage/123",
        repository: "http://example.com/owner/repo",
        commitOid: "a1b2c3",
        coverage: 42,
        filesCount: 123,
        linesCount: 1230,
        linesHitCount: 516,
      }
      const validator = new RecordValidator(record)

      expect(validator.isValid).toBe(true)
    })

    test("is valid with a nested repository record", () => {
      const record = {
        _type: "CoverageTotals",
        self: "http://example.com/test-coverage/123",
        repository: {
          _type: "Repository",
          id: "123",
          self: "http://example.com/owner/repo",
          owner: {
            id: "owner",
            type: "organization",
            name: "owner",
          },
          name: "repo"
        },
        commitOid: "a1b2c3",
        coverage: 42,
        filesCount: 123,
        linesCount: 1230,
        linesHitCount: 516,
      }
      const validator = new RecordValidator(record)

      expect(validator.isValid).toBe(true)
    })

    test("is invalid with a invalid repository", () => {
      let record = {
        _type: "CoverageTotals",
        self: "http://example.com/test-coverage/123",
        repository: { foo: "bar" },
        commitOid: "a1b2c3",
        coverage: 42,
        filesCount: 123,
        linesCount: 1230,
        linesHitCount: 516,
      }

      // validate an invalid sub-object
      let validator = new RecordValidator(record)
      expect(validator.isValid).toBe(false)

      // @ts-ignore: validate an invalid string val
      record.repository = "foo"
      validator = new RecordValidator(record)
      expect(validator.isValid).toBe(false)

      // @ts-ignore: validate an invalid type
      record.repository = 123
      validator = new RecordValidator(record)
      expect(validator.isValid).toBe(false)

      // @ts-ignore: validate an invalid null
      record.repository = null
      validator = new RecordValidator(record)
      expect(validator.isValid).toBe(false)

      // validate missing repository entirely
      delete record.repository
      validator = new RecordValidator(record)
      expect(validator.isValid).toBe(false)
    })
  })

  describe("unknown record type", () => {
    test("is not valid", () => {
      const record = {
        _type: "Foo",
        attributes: { }
      }
      const validator = new RecordValidator(record)

      expect(validator.isValid).toBe(false)
      expect(validator.errors[0]).toMatch(/"Foo" is not a recognized record type/)
    })
  })

  describe("object without type", () => {
    test("is not valid", () => {
      const record = { }
      const validator = new RecordValidator(record)

      expect(validator.isValid).toBe(false)
      expect(validator.errors[0]).toMatch(/missing required attribute "_type"/)
    })
  })
})
