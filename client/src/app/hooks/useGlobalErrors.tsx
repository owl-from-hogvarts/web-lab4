import { TServerError } from "app/api/api";
import React, { useCallback, useContext, useState } from "react";
import { createContext } from "react";

type TError = TServerError

type TErrorContext = {
  put: (...errors: TError[]) => void,
  take: () => TError | undefined
}

const ErrorContext = createContext<TErrorContext | null>(null);

export function GlobalErrorProvider({ children }: React.PropsWithChildren) {
  const [errors, setErrors] = useState<TError[]>([])

  const put = useCallback((...errors: TError[]) => {
    setErrors(prev => [...prev, ...errors])
  }, [setErrors])

  const take = useCallback(() => {
    // typescript does not understands that array may be empty
    const currentError: TError | undefined = errors[0]
    setErrors(errors.slice(1))
    return currentError
  }, [errors])
  
  return <ErrorContext.Provider value={{put, take}}>
    {children}
  </ErrorContext.Provider>
}

export default function useGlobalErrors() {
  return useContext(ErrorContext)
}
