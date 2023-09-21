import StapeSGTM, { transformations, EventData } from 'stape-sgtm-nodejs';

const sgtm = new StapeSGTM({
  gtm_server_domain: 'https://38c0-194-44-56-60.ngrok-free.app',
  request_path: '/webhook',
});

const eventData: EventData = {
  client_id: '123',
  currency: 'USD',
  event_name: 'page_view',
  ip_override: '127.0.0.1',
  language: 'en',
  page_encoding: 'UTF-8',
  page_hostname: 'localhost',
  page_location: 'http://localhost:3000',
  page_path: '/',
  user_data: {
    sha256_email_address: transformations.sha256hex('jhonn@doe.com'),
    phone_number: '123456789',
    address: {
      first_name: 'Jhon',
    },
  },
};

sgtm
  .sendEventData('page_view', eventData)
  .then((result) => console.log('🚀 ~ file: simple.ts:19 ~ result:', result))
  .catch((error) => console.log('🚀 ~ file: simple.ts:21 ~ error:', error));
