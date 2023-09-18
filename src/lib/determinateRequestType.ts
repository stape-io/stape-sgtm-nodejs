import ConfigType from "../interfaces/ConfigType";
import EventDataType from "../interfaces/EventDataType";

function determinateRequestType(eventData: EventDataType, configData: ConfigType, length: number = 0): string {
  console.log("🚀 ~ file: determinateRequestType.js:2 ~ determinateRequestType ~ configData:", configData)
  if (configData?.request_type != 'auto') {
    return configData.request_type;
  }

  if (configData?.richsstsse) {
    return 'post';
  }

  const isHashingEnabled = eventData.some(
    (item) =>
      item.transformation === 'md5' ||
      item.transformation === 'sha256base64' ||
      item.transformation === 'sha256hex'
  );
  if (isHashingEnabled) return 'post';
  return length > 1500 ? 'post' : 'get';
}

export default determinateRequestType;