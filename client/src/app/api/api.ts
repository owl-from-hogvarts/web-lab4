import getUserToken from "app/auth/auth";
import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { logoutUser } from "./users";
import { PutErrorFunction } from "app/hooks/useGlobalErrors";

const API_VERSION = "v1";
const api = axios.create({
  baseURL: `http://localhost:17025/api/${API_VERSION}`
});

const NOT_AUTHORIZED = 401;
const FORBIDDEN = 403;

type TServerErrorResponse = {
  error: TServerErrorPayload;
};

export type TServerErrorPayload =
  | {
      /** Message to display in user interface */
      message: string;
      /** Client may have arbitrary logic depending on `errorType` */
      errorType: string;
    }
  | {
      message: string;
      errorType: "error/unknown";
      /** Intended for developers */
      details: string;
    };

export const REDIRECT_TO_PARAM_NAME = "to";

export function setupInterceptors(
  navigateTo: NavigateFunction,
  putError: PutErrorFunction
) {
  const interceptorId = api.interceptors.response.use(null, (_error) => {
    const error = _error as AxiosError;
    if (!error.isAxiosError || !error.response) {
      return;
    }

    if (error.response.status !== NOT_AUTHORIZED) {
      if (error.response.status === FORBIDDEN) {
        navigateTo("/forbidden");
      }
      if (isServerError(error)) {
        putError(error.response.data.error);
      }
      return Promise.reject(error);
    }

    const to = encodeURI(window.location.pathname + window.location.search);
    const params = new URLSearchParams();
    if (getUserToken()) {
      logoutUser(navigateTo)();
      return;
    }
    params.set(REDIRECT_TO_PARAM_NAME, to);

    navigateTo("/login?" + params.toString());
  });

  return () => api.interceptors.response.eject(interceptorId)
}

api.interceptors.request.use((request) => {
  const token = getUserToken();
  if (token != null) {
    request.params = { ...request.params, user_token: token };
  }

  return request;
});

export default api;

export function isServerError(
  error: AxiosError<unknown, unknown>
): error is AxiosError<TServerErrorResponse> {
  if (!error.response?.data) {
    return false;
  }

  const payload = error.response.data as Partial<TServerErrorResponse>;
  if (!payload.error) {
    return false;
  }

  if (!payload.error.errorType.startsWith("error")) {
    return false;
  }

  return true;
}
