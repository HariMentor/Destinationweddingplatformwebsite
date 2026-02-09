import axios, { AxiosInstance } from "axios";
import TokenService from "./TokenService";

// NEXT_PUBLIC_API_BASE_URL is replaced at build time by Next.js and is available
// to client bundles if prefixed with NEXT_PUBLIC_. Use the literal `process.env.NEXT_PUBLIC_API_BASE_URL`
// (avoid optional-chaining which prevents proper build-time replacement).
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL as string) || "";

if (process.env.NODE_ENV !== "production") {
  // show where requests will be sent during development
  // eslint-disable-next-line no-console
  console.debug("API base URL:", API_BASE_URL || "(relative) ");
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL || undefined,
  withCredentials: true,
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = TokenService.getLocalAccessToken();
    console.log(accessToken, "access token in interceptor");
    if (accessToken) {
      if (!config.headers) config.headers = {} as any;
      // @ts-ignore
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    if (config.data instanceof FormData) {
      if (config.headers && "Content-Type" in config.headers) {
        // @ts-ignore
        delete config.headers["Content-Type"];
      }
    } else {
      if (!config.headers) config.headers = {} as any;
      // @ts-ignore
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
