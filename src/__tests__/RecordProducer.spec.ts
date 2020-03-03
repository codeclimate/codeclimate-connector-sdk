import { RecordProducerFacade, InvalidRecordError } from "../RecordProducer"

describe(RecordProducerFacade, () => {
  describe("producing a record", () => {
    it("forwards a valid record to the wrapped producer", () => {
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
      const mockWriter = jest.fn()
      const producer = new RecordProducerFacade({ produce: mockWriter })

      producer.produce(record)

      expect(mockWriter.mock.calls.length).toBe(1)
      expect(mockWriter.mock.calls[0][0]).toBe(record)
    })

    it("raises on invalid record", () => {
      const record = {
        _type: "Incident",
        id: "a1b2c3",
        title: "an incident",
      }
      const mockWriter = jest.fn()
      const producer = new RecordProducerFacade({ produce: mockWriter })

      expect(
        () => { producer.produce(record) }
      ).toThrow(InvalidRecordError)

      expect(mockWriter.mock.calls.length).toBe(0)
    })
  })
})
