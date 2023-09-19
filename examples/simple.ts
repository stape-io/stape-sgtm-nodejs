import StapeSGTM from '../src/index';

const sgtm = new StapeSGTM({
  gtm_server_domain: 'https://38c0-194-44-56-60.ngrok-free.app',
  request_path: '/webhook',
});

const eventData = sgtm.eventData();
eventData.code = sgtm.transformation.sha256hex('123');

sgtm.sendEventData('page_view', eventData, (data, error) => {
  console.log("🚀 ~ file: test.ts:12 ~ data:", data, error)
});


(async() => {
  try {
    const result = await sgtm.sendEventData('page_view', eventData)
    console.log("🚀 ~ file: simple.ts:19 ~ result:", result)
  } catch (error) {
    console.log("🚀 ~ file: simple.ts:21 ~ error:", error)
  }
})()
