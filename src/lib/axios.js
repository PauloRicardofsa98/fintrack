import axios from "axios";

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/constants/local-storage";

export const protectedApi = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const publicApi = axios.create({
  baseURL: "http://localhost:8080/api",
});

protectedApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

  if (!accessToken) return config;
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;

    const oldRefreshToken = localStorage.getItem(
      LOCAL_STORAGE_REFRESH_TOKEN_KEY,
    );
    if (!oldRefreshToken) {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes("/users/refresh-token")
    ) {
      request._retry = true;
      try {
        const response = await protectedApi.post("/users/refresh-token", {
          refreshToken: oldRefreshToken,
        });

        const { accessToken, refreshToken } = response.data;
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken);

        request.headers.Authorization = `Bearer ${accessToken}`;

        return protectedApi(request);
      } catch (refreshError) {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
        console.error("Error while refreshing token", refreshError);
      }
    }

    return Promise.reject(error);
  },
);
