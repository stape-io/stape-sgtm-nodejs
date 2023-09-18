interface EventDataItem {
  name: string,
  value: string,
  transformation?: string,
}

interface EventDataType extends Array<EventDataItem>{}

export default EventDataType;