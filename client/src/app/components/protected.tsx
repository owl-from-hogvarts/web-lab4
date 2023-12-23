import React, { useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom";

export type ProtectedRouteProps = React.PropsWithChildren<{}>

export default function ProtectedRoute({children}: ProtectedRouteProps) {
  // const isAuthorized = useIsAuthorized()
  const isAuthorized = false
  const nav = useNavigate()

  if (!isAuthorized) {
    useEffect(() => {
      nav("/login")
    })
    return <></>
  }

  return children


}



