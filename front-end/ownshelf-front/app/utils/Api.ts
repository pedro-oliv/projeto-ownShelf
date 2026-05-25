import axios from 'axios';
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute =
      originalRequest.url?.includes("users/auth/login") ||
      originalRequest.url?.includes("users/auth/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post(
          "users/auth/refresh",
          {},
          {
            withCredentials: true,
          }
        );

        processQueue(null);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
