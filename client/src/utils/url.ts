import { displayError } from "./error.js";

export type TErrorResponse = {
  error: {
    message: string;
    paramName?: string;
  };
};

export function mergeQueryParams(
  initialParams: URLSearchParams,
  updatedParams: URLSearchParams
) {
  for (const [key, value] of updatedParams) {
    initialParams.set(key, value);
  }

  return initialParams;
}

export function NaNToUndefined(
  possibleNaN: string | number | undefined | null
): number | undefined {
  if (possibleNaN === "" || possibleNaN === undefined || possibleNaN === null) {
    return;
  }

  const parse = Number(possibleNaN);
  return isNaN(parse) ? undefined : parse;
}

export const url = new URL(document.URL);

export const INVALID_DATA_ERROR_CODE = 422;

const apiErrorMessages: { [key: number]: string } = {
  [INVALID_DATA_ERROR_CODE]: "Invalid data! Check input",
};

export function isRequestOk({ status }: { status: number }) {
  return status === 200;
}

export function displayKnownError({ error }: TErrorResponse) {
  const prefix = error.paramName ? `Issue with field ${error.paramName}: ` : "";
  displayError(prefix + error.message);
}

export function displaySimpleRequestError(status: number) {
  const errorMessage = apiErrorMessages[status];
  displayError(errorMessage);
}

export function nonUndefinedProperties<T extends {[key: string]:unknown | undefined}>(parsed: T): Partial<T> {
  const filtered = Object.entries(parsed).filter(([_, v]) => v !== undefined);
  return Object.fromEntries(filtered) as Partial<T>
}
