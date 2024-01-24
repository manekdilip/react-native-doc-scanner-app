// import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
// import {STORAGE_CONSTANT} from '../constant';

Axios.interceptors.request.use(async config => {
  //   const token = await AsyncStorage.getItem(STORAGE_CONSTANT.TOKEN);
  const token = global.access_token;

  config.headers = {
    ['auth-token']: token,
    'Content-Type': 'application/json',
    ...config.headers,
  };

  config.timeout = 30000;

  return config;
});

const getRequestApi = url => {
  return new Promise((resolve, reject) => {
    Axios.get(url)
      .then(result => {
        console.log('URL:', url);
        console.log('RESPONSE:', result.data);
        resolve({
          errorStatus: false,
          statusCode: result.status,
          data: result.data,
        });
      })
      .catch(error => {
        if (error?.response) {
          resolve({
            errorStatus: true,
            statusCode: error?.response.status,
            data: error?.response.data,
          });
        } else {
          reject(error);
        }
      });
  });
};

const postRequestApi = (url, data, headers) => {
  console.log('URL:', url);
  console.log('PAYLOAD:', data);
  return new Promise((resolve, reject) => {
    Axios.post(url, data, {
      headers: headers,
    })
      .then(result => {
        console.log('RESPONSE:', result.data);
        resolve({
          errorStatus: false,
          statusCode: result.status,
          data: result.data,
        });
      })
      .catch(error => {
        console.log('ERROR:', JSON.stringify(error), '====>url :' + url);
        if (error?.response) {
          resolve({
            errorStatus: true,
            statusCode: error?.response.status,
            data: error?.response.data,
          });
        } else {
          reject(error);
        }
      });
  });
};

const patchRequestApi = (url, data, headers) => {
  console.log('URL:', url);
  console.log('PATHCH PAYLOAD:', data);
  return new Promise((resolve, reject) => {
    Axios.patch(url, data, {
      headers: headers,
    })
      .then(result => {
        console.log('PATCH RESPONSE:', result.data);
        resolve({
          errorStatus: false,
          statusCode: result.status,
          data: result.data,
        });
      })
      .catch(error => {
        console.log('ERROR:', JSON.stringify(error), '====>url :' + url);
        if (error?.response) {
          resolve({
            errorStatus: true,
            statusCode: error?.response.status,
            data: error?.response.data,
          });
        } else {
          reject(error);
        }
      });
  });
};

const putRequestApi = (url, data, headers) => {
  console.log('URL:', url);
  console.log('PUT PAYLOAD:', data);
  return new Promise((resolve, reject) => {
    Axios.put(url, data, {
      headers: headers,
    })
      .then(result => {
        console.log('PUT RESPONSE:', result.data);
        resolve({
          errorStatus: false,
          statusCode: result.status,
          data: result.data,
        });
      })
      .catch(error => {
        console.log('ERROR:', JSON.stringify(error), '====>url :' + url);
        if (error?.response) {
          resolve({
            errorStatus: true,
            statusCode: error?.response.status,
            data: error?.response.data,
          });
        } else {
          reject(error);
        }
      });
  });
};

const deleteRequestApi = (url, data) => {
  console.log('deleteURL:', url);
  console.log('deletePayload:', data);

  return new Promise((resolve, reject) => {
    Axios.delete(url, {
      data,
    })
      .then(result => {
        console.log('DELETE RESPONSE:', result.data);
        resolve({
          errorStatus: false,
          statusCode: result.status,
          data: result.data,
        });
      })
      .catch(error => {
        if (error?.response) {
          resolve({
            errorStatus: true,
            statusCode: error?.response.status,
            data: error?.response.data,
          });
        } else {
          reject(error);
        }
      });
  });
};

export {
  getRequestApi,
  postRequestApi,
  patchRequestApi,
  putRequestApi,
  deleteRequestApi,
};
