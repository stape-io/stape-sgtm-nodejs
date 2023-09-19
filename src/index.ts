import ConfigType from "./interfaces/ConfigType";
import EventDataType from "./interfaces/EventDataType";
import ParamsType from "./interfaces/ParamsType";
import TransformationType from "./interfaces/TransformationType";
import { trim, base64, sha256base64, sha256hex, md5, toLowerCase } from "./lib/getCustomData";
import sendData from "./lib/sendData";
import * as querystring from 'querystring'

interface CallbackType {
  (data: any, error: any): any
}

class StapeSGTM {
  private configData: ConfigType = {
    request_path: '/data',
    gtm_server_domain: '',
    protocol_version: 2,
    richsstsse: false,
  };

  private evenDataDefault: any = {
    client_id: 'ABC_123',
    currency: 'USD',
    event_name: 'purchase',
    ip_override: '1.2.3.4',
    language: 'en_us',
    page_encoding: 'UTF-8',
    page_hostname: 'example.com',
    page_location: 'https://example.com',
    page_path: '/path/to/page',
    page_referrer: 'https://www.google.com',
    page_title: 'Home',
    screen_resolution: '1024x768',
    user_agent: '',
    user_data: {
      email_address: 'foo@example.com',
      phone_number: '+15551234567',
      address: {
        first_name: 'Jane',
        sha256_first_name: '',
        last_name: 'Doe',
        sha256_last_name: '',
        street: '123 Fake St',
        city: 'City Town',
        region: 'CA',
        postal_code: '54321',
        country: 'US',
      },
    },
    user_id: '',
    value: '10',
    viewport_size: '725x345',
  }

  transformation: TransformationType = {
    trim,
    base64,
    sha256base64,
    sha256hex,
    md5,
    toLowerCase,
  }

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

  eventData(values?: any){
    return {...this.evenDataDefault, ...values};
  }

  async sendEventData(event_name: string, eventData: EventDataType, callback: CallbackType = () => {}): Promise<any> {
    this.validateConfig();
    try {
      const path = this.configData.request_path + '?v=' + this.configData.protocol_version + '&event_name=' + querystring.escape(event_name) + (this.configData.richsstsse ? '&richsstsse' : '');
      eventData.event_name = event_name;
      eventData.v = this.configData.protocol_version;
      const result = await sendData({
        hostname: this.configData.gtm_server_domain,
        path
      })
      callback(result, null);
      return result;
    } catch (error) {
      callback(null, error);
      let errorObject: any = new Error('Something went wrong while sending the event.');
      errorObject.details = error;
      throw errorObject;
    }
  }
}

export default StapeSGTM;