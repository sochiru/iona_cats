import axios from 'axios';
import ENV from 'consts/env';

/**
 * axios instance with api key and base url
 */
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
    (error) => Promise.reject(error)
  );

  return axiosInstance;
};
