import { Buffer } from 'buffer';
import EventDataType from '../interfaces/EventDataType';
import * as crypto from 'crypto';

function getCustomData(customData: EventDataType, dtagLoaded: boolean) {
  const data: any = {};
  customData.forEach(item => {
    let dataValue = item.value;
    let dataTransformation = item.transformation;
    if (dataValue) {
      if (dataTransformation === 'trim') {
        // dataValue = makeString(dataValue);
        dataValue = dataValue.trim();
      }

      if (dataTransformation === 'to_lower_case') {
        // dataValue = makeString(dataValue);
        dataValue = dataValue.trim().toLowerCase();
      }

      if (dataTransformation === 'base64') {
        // dataValue = makeString(dataValue);
        dataValue = Buffer.from(dataValue).toString('base64');
      }

      if (dtagLoaded && dataTransformation === 'md5') {
        const hash = crypto.createHash('md5').update(dataValue.trim().toLowerCase(), 'utf-8');
        const md5Hash = hash.digest('hex');
        dataValue = md5Hash;
      }

      if (dtagLoaded && dataTransformation === 'sha256base64') {
        const hash = crypto.createHash('sha256').update(dataValue.trim().toLowerCase(), 'utf-8');
        const sha256HashBase64 = hash.digest('base64');
        dataValue = sha256HashBase64;
      }

      if (dtagLoaded && dataTransformation === 'sha256hex') {
        const hash = crypto.createHash('sha256').update(dataValue.trim().toLowerCase(), 'utf-8');
        const sha256HashHex = hash.digest('hex');
        dataValue = sha256HashHex;
      }
      data[item.name] = dataValue;
    }
  });
  return data;
}



export default getCustomData;