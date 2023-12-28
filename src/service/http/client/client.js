import axios from "axios";
import { apiBaseUrl } from "@/environment";
import { AuthService } from "@/modules/auth";

const config = {
  baseURL: apiBaseUrl,
};

const client = axios.create(config);

const authInterceptor = (config) => {
  if (AuthService.check() && config.url !== "/add-book") {
    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `Bearer ${AuthService.token}`;
  } else {
    if (config.url === "/add-book") {
      config.headers["Content-Type"] = "multipart/form-data";
      config.headers.Authorization = `Bearer ${AuthService.token}`;
    } else {
      config.headers["Content-Type"] = "application/json";
    }
  }

  return config;
};

const loggerInterceptor = (config) => config;

client.interceptors.request.use(authInterceptor);
client.interceptors.request.use(loggerInterceptor);

client.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    if (error === 401) AuthService.logout();
    throw error;
  }
);

export default client;
