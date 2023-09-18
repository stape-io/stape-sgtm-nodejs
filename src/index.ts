import ConfigType from "./interfaces/ConfigType";
import EventDataType from "./interfaces/EventDataType";
import ParamsType from "./interfaces/ParamsType";
import determinateRequestType from "./lib/determinateRequestType";
import getCustomData from "./lib/getCustomData";
import getPathUrl from "./lib/getPathUrl";
import sendData from "./lib/sendData";

interface CallbackType {
  (data: any, error: any): any
}

class Sgtm {
  private configData: ConfigType = {
    request_path: '/data',
    gtm_server_domain: '',
    protocol_version: 2,
    richsstsse: false,
    request_type: 'post',
  };

  validateConfig() {
    if (!this.configData.gtm_server_domain || this.configData.gtm_server_domain.indexOf('https://') < 0 || this.configData.gtm_server_domain[this.configData.gtm_server_domain.length - 1] == '/') {
      throw new Error('You did not fill in the variable gtm_server_domain. Example: https://gtm.stape.io')
    }
    if (!this.configData.request_path || this.configData.request_path[0] != '/') {
      throw new Error('You did not fill in the variable request_path. Example: /')
    }
  }

  constructor(params: ParamsType) {
    this.configData.gtm_server_domain = params.gtm_server_domain;
    this.configData.request_path = params.request_path || '/data';
    this.validateConfig()
  };

  async sendEventData(event_name: string, eventData: EventDataType, callback: CallbackType = () => {}): Promise<any> {
    this.validateConfig();
    try {
      const method = determinateRequestType(eventData, this.configData, JSON.stringify(eventData).length);
      const customData = getCustomData(eventData, method == 'post');
      const path = getPathUrl(method, event_name, this.configData, customData)
      if(method == 'post'){
        customData.event_name = event_name;
        customData.v = this.configData.protocol_version;
      }
      return sendData({
        method,
        hostname: this.configData.gtm_server_domain,
        path
      }).then((result: any) => callback(result, null)).catch((err: any) => callback(null, err))
    } catch (error) {
      throw new Error('Something went wrong while sending the event.')
    }
  }
}

export default Sgtm;