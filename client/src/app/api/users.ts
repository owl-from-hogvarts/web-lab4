import { setUserToken } from "app/auth/auth"
import api from "./api"
import { NavigateFunction } from "react-router-dom"

export type TLoginData = {
  login: string,
  password: string,
}

type TLoginUserResponse = {
  UUID: string
}

const USERS_ENDPOINT = "/users"

export function registerUser(nav: NavigateFunction) {
  return async (data: TLoginData) => {
    await api.post(USERS_ENDPOINT, null, {
      params: data
    })

    nav("/login")
  }
}

export function logoutUser(nav: NavigateFunction) {
  return () => {
    setUserToken(null)
    window.location.reload()
  }
}

export async function loginUser(data: TLoginData): Promise<string> {
  const response = await api.get<TLoginUserResponse>(USERS_ENDPOINT, {
    params: data
  })
  const { UUID } = response.data
  setUserToken(UUID)

  return UUID
}


