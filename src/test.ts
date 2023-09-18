import Sgtm from './index';

const sgtm = new Sgtm({
    gtm_server_domain: 'https://38c0-194-44-56-60.ngrok-free.app',
    request_path: '/webhook',
  });

  sgtm.sendEventData('page_view', [
    {
      name: 'title',
      value: 'Page 1',
      transformation: 'md5'
    },
  ], (data, error) => {
    console.log("🚀 ~ file: test.ts:17 ~ data:", data, error)
  });

