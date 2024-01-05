import { TServerErrorPayload } from "app/api/api";
import React, { useCallback, useContext, useState } from "react";
import { createContext } from "react";

type TError = TServerErrorPayload;

export type PutErrorFunction = (...errors: TError[]) => void

type TErrorContext = {
  put: PutErrorFunction;
  take: () => TError | undefined;
};

// context should be ready on time
// but use this array for insurance
const initialErrors: TError[] = [];

const ErrorContext = createContext<TErrorContext>({
  take: initialErrors.shift.bind(initialErrors),
  put: initialErrors.push.bind(initialErrors),
});

export function GlobalErrorProvider({ children }: React.PropsWithChildren) {
  const [errors, setErrors] = useState<TError[]>(initialErrors);

  const put = useCallback(
    (...errors: TError[]) => {
      setErrors((prev) => [...prev, ...errors]);
    },
    [setErrors]
  );

  const take = useCallback(() => {
    // typescript does not understands that array may be empty
    if (errors.length > 0) {
      const currentError: TError = errors[0];
      setErrors(errors.slice(1));
      return currentError;
    }
  }, [errors]);

  return (
    <ErrorContext.Provider value={{ put, take }}>
      {children}
    </ErrorContext.Provider>
  );
}

export default function useGlobalErrors() {
  return useContext(ErrorContext);
}
