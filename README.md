# Stape sGTM NodeJS SDK

## Getting Started

### Configuration

Fill in the basic parameters:

```javascript
import StapeSGTM, { transformations, EventData } from 'stape-sgtm-nodejs';

const sgtm = new StapeSGTM({
   gtm_server_domain: 'https://gtm.stape.io',
   request_path: '/data',
 });
```

| Variable          | Description             |
|-------------------|-------------------------|
| gtm_server_domain | Server host             |
| request_path      | Request processing path |


### Sending Event Data

```javascript
sgtm.sendEventData(<eventName>, <eventData>);
```

| Variable         | Description                             |
|------------------|-----------------------------------------|
| eventName        | Event name                              |
| eventData        | Array of options for forming event data |


**eventData**

```javascript
const eventData = [{
  page_hostname: 'Stape',
  page_location: 'http://stape.io',
}]
```

| Option | Description    |
|--------|----------------|
| name   | Variable name  |
| value  | Variable value |

####  Transformations

| Option       | Description                                                |
|--------------|------------------------------------------------------------|
| trim         | Removes whitespace from the beginning and end of the value |
| base64       | Encodes the string in Base64 format                        |
| md5          | Encodes the string in MD5 format                           |
| sha256base64 | Encodes the string in SHA256 Base64 format                 |
| sha256hex    | Encodes the string in SHA256 HEX format                    |


### Full Example

```javascript
import StapeSGTM, { transformations, EventData } from 'stape-sgtm-nodejs';

const sgtm = new StapeSGTM({
  gtm_server_domain: 'https://gtm.stape.io',
  request_path: '/data',
});

const eventData: EventData = {
  client_id: '123456',
  currency: 'USD',
  ip_override: '79.144.123.69',
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
```
