import Axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';
import { useNotificationStore } from '@/stores/notifications';
import storage from '@/utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }

    (config.headers as AxiosHeaders).set('authorization', `Bearer ${token}`);
  }

  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const message = error.response?.data?.message || error.message;
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        originalRequest._retryCount = originalRequest._retryCount || 0;
        if (originalRequest._retryCount < 3) {
          const refreshToken = localStorage.getItem('ep_refresh_token');

          if (!refreshToken) {
            storage.clearToken();
            window.location.replace('/');
            return Promise.reject(error);
          }

          try {
            const response = await axios.post('/app/auth/refresh-token/', {
              refresh: refreshToken,
            });
            const { access } = response.data;
            storage.setToken(access);

            if (!originalRequest.headers) {
              originalRequest.headers = {};
            }

            (originalRequest.headers as AxiosHeaders).set('authorization', `Bearer ${access}`);
            originalRequest._retryCount += 1;
            return axios(originalRequest);
          } catch (retryError) {
            storage.clearToken();
            window.location.replace('/');
            return Promise.reject(retryError);
          }
        } else {
          storage.clearToken();
          window.location.replace('/');
          return Promise.reject(error);
        }
      }
    }

    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  }
);
