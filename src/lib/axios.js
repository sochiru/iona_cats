import axios from 'axios';
import ENV from 'consts/env';

export default () => {
  const baseURL = ENV.API_BASE_URL;
  const apiKey = ENV.API_KEY;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  headers['x-api-key'] = apiKey;

  const axiosInstance = axios.create({
    baseURL,
    headers
  });

  axiosInstance.interceptors.response.use(
    (response) => new Promise((resolve) => {
      resolve(response);
    }),
    (error) => {
      if (error.response) {
        // temp
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
