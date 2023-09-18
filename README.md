# Stape sGTM NodeJS SDK

## Getting Started

### Configuration

Fill in the basic parameters:
```javascript
const sgtmSDK = require('stape-sgtm-nodejs');

const sgtm = new sgtmSDK({
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
sgtm.sendEventData(<eventName>, <eventData>, <callbackFunction>);
```
| Variable         | Description                             |
|------------------|-----------------------------------------|
| eventName        | Event name                              |
| eventData        | Array of options for forming event data |
| callbackFunction | Server response function                |


#### Example eventData 
```javascript
const eventData = [{
    name: 'title',
    value: 'Page Title',
    transformation: 'md5',
}]
```
| Option         | Description                   |
|----------------|-------------------------------|
| name           | Variable name                 |
| value          | Variable value                |
| transformation | Variable value transformation |


####  Transformation

| Варіанти     | Description                                                |
|--------------|------------------------------------------------------------|
| trim         | Removes whitespace from the beginning and end of the value |
| base64       | Encodes the string in Base64 format                        |
| md5          | Encodes the string in MD5 format                           |
| sha256base64 | Encodes the string in SHA256 Base64 format                 |
| sha256hex    | Encodes the string in SHA256 HEX format                    |


#### Example callbackFunction 

```javascript
function callBack(result, error){
    if(error){
        console.log('Error', error);
        return;
    }
    console.log('Result:', result);
}
```
