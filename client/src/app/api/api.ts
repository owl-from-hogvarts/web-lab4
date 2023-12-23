
import getUserToken from "app/auth/auth";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { redirect } from "react-router-dom";

const API_VERSION = "v1"
const api = axios.create({
  baseURL: `http://localhost:8080/api/${API_VERSION}`,
})

const AUTH_FAILED_ERR_CODE = 401

export const REDIRECT_TO_PARAM_NAME = "to"

api.interceptors.response.use(null, _error => {
  const error = _error as AxiosError
  if (!error.isAxiosError || !error.response) {
    return
  }

  if (error.response.status !== AUTH_FAILED_ERR_CODE) {
    return
  }

  const to = encodeURI(window.location.href)
  const loginUrl = new URL("/login")
  loginUrl.searchParams.set(REDIRECT_TO_PARAM_NAME, to)

  redirect(loginUrl.toString())
})

api.interceptors.request.use(request => {
  request.params.user_token = getUserToken()
  return request
})

export default api
