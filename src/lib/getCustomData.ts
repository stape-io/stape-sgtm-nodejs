import { Buffer } from 'buffer';
import EventDataType from '../interfaces/EventDataType';
import * as crypto from 'crypto';

function getCustomData(customData: any, dtagLoaded: boolean = true) {
  const data: any = {};
  customData.forEach((item: any) => {
    let dataValue = item.value;
    let dataTransformation = item.transformation;
    if (dataValue) {
      if (dataTransformation === 'trim') {
        dataValue = trim(dataValue);
      }

      if (dataTransformation === 'to_lower_case') {
        dataValue = toLowerCase(dataValue);
      }

      if (dataTransformation === 'base64') {
        dataValue = base64(dataValue);
      }

      if (dtagLoaded && dataTransformation === 'md5') {
        dataValue = md5(dataValue);
      }

      if (dtagLoaded && dataTransformation === 'sha256base64') {
        dataValue = sha256base64(dataValue);
      }

      if (dtagLoaded && dataTransformation === 'sha256hex') {
        
        dataValue = sha256hex(dataValue);
      }
      data[item.name] = dataValue;
    }
  });
  return data;
}


export function base64(value: string): string {
  return Buffer.from(value).toString('base64');
}

export function trim(value: string): string {
  return value.trim();
}

export function sha256base64(value: string): string {
  const hash = crypto.createHash('sha256').update(value.trim().toLowerCase(), 'utf-8');
  const sha256HashBase64 = hash.digest('base64');
  return sha256HashBase64;
}

export function sha256hex(value: string): string {
  const hash = crypto.createHash('sha256').update(value.trim().toLowerCase(), 'utf-8');
  const sha256HashHex = hash.digest('hex');
  return sha256HashHex;
}

export function md5(value: string): string {
  const hash = crypto.createHash('md5').update(value.trim().toLowerCase(), 'utf-8');
  const md5Hash = hash.digest('hex');
  return md5Hash;
}

export function toLowerCase(value: string): string {
  return value.trim().toLowerCase();
}


export default getCustomData;