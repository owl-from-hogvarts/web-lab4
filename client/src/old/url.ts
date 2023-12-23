import { displayError } from "./error.js"

export type TErrorResponse = {
  error: {
    message: string,
    paramName?: string
  }
}

export function mergeQueryParams(initialParams: URLSearchParams, updatedParams: URLSearchParams) {
  for (const [key, value] of updatedParams) {
    initialParams.set(key, value)
  }
}

export const url = new URL(document.URL)


const API_ORIGIN = url.origin
const API_BASE = ""
const API_INTERSECT_ENDPOINT = "/app"
const API_ACCESS_PARAM = "isJson"
export const INVALID_DATA_ERROR_CODE = 422

export function buildEndpointUrl() {
  const url = new URL(API_BASE + API_INTERSECT_ENDPOINT, API_ORIGIN)
  url.searchParams.set(API_ACCESS_PARAM, "")

  return url
}

const apiErrorMessages: {[key: number]: string} = {
  [INVALID_DATA_ERROR_CODE]: "Invalid data! Check input"
}

export function isRequestOk({status}: {status: number}) {
  return status === 200
}

export function displayKnownError({error}: TErrorResponse) {
  const prefix = error.paramName ? `Issue with field ${error.paramName}: `: ""
  displayError(prefix + error.message)
}

export function displaySimpleRequestError(status: number) {
  const errorMessage = apiErrorMessages[status]
  displayError(errorMessage)
}
