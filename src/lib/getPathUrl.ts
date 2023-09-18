import * as querystring from 'querystring'
import ConfigType from '../interfaces/ConfigType';
import { Buffer } from 'buffer';

function getPathUrl(method: string, event_name: string, configData: ConfigType, eventData: any = {}) {
  if (method == 'post') {
    return configData.request_path +
      '?v=' +
      configData.protocol_version +
      '&event_name=' +
      querystring.escape(event_name) +
      (configData.richsstsse ? '&richsstsse' : '');
  }

  let url = configData.request_path +
    '?v=' +
    configData.protocol_version +
    '&event_name=' +
    querystring.escape(event_name);
  const base64Data = Buffer.from(JSON.stringify(eventData)).toString('base64');
  const encodedUriComponent = querystring.escape(base64Data);
  url += '&dtdc=' + encodedUriComponent;

  return url;
}


export default getPathUrl;