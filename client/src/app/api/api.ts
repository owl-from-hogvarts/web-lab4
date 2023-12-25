import getUserToken from "app/auth/auth";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { NavigateFunction, redirect } from "react-router-dom";

const API_VERSION = "v1";
const api = axios.create({
  baseURL: `http://localhost:17025/api/${API_VERSION}`,
});

const AUTH_FAILED_ERR_CODE = 401;

export const REDIRECT_TO_PARAM_NAME = "to";

export function setupInterceptors(navigateTo: NavigateFunction) {
  api.interceptors.response.use(null, (_error) => {
    const error = _error as AxiosError;
    if (!error.isAxiosError || !error.response) {
      return;
    }

    if (error.response.status !== AUTH_FAILED_ERR_CODE) {
      return;
    }

    const to = encodeURI(window.location.pathname + window.location.search);
    const params = new URLSearchParams();
    params.set(REDIRECT_TO_PARAM_NAME, to);

    navigateTo("/login?" + params.toString());
  });
}

api.interceptors.request.use((request) => {
  const token = getUserToken();
  if (token != null) {
    request.params = { ...request.params, user_token: token };
  }

  return request;
});

export default api;
