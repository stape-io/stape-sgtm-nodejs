import axios from 'axios'

function sendData({
  hostname = '',
  path = '',
  postData = {},
  method = 'get'
}) {
  return new Promise((resolve, reject) => {
    if (method == 'post') {
      axios.post(hostname + path, postData)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject({
            status: error.response.status,
            statusText: error.response.statusText,
            error: error.response.data,
          })
        })
    }
    axios.get(hostname + path)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject({
          status: error.response.status,
          statusText: error.response.statusText,
          error: error.response.data,
        })
      })
  });
}


export default sendData;