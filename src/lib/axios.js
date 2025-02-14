import axios from "axios";

import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "@/constants/local-storage";

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
