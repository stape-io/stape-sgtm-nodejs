import StapeSGTM, { transformations, EventData } from 'stape-sgtm-nodejs';

const sgtm = new StapeSGTM({
  gtm_server_domain: 'https://gtm.stape.io',
  request_path: '/data',
});

const eventData: EventData = {
  client_id: '123456',
  currency: 'USD',
  event_name: 'page_view',
  ip_override: '79.144.69.69',
  language: 'en',
  page_encoding: 'UTF-8',
  page_hostname: 'Stape',
  page_location: 'http://stape.io',
  page_path: '/',
  user_data: {
    sha256_email_address: transformations.sha256hex('jhonn@doe.com'),
    phone_number: '123456769',
    address: {
      first_name: 'Jhon',
    },
  },
};

sgtm
  .sendEventData('page_view', eventData)
  .then((result) => console.log('🚀 ~ file: simple.ts:19 ~ result:', result))
  .catch((error) => console.log('🚀 ~ file: simple.ts:21 ~ error:', error));
