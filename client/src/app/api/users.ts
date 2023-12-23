import { setUserToken } from "app/auth/auth"
import api from "./api"

export type TLoginData = {
  login: string,
  password: string,
}

type TLoginUserResponse = {
  token: string
}

export async function loginUser(data: TLoginData): Promise<string> {
  const response = await api.get<TLoginUserResponse>("/users", {
    params: data
  })
  const { token } = response.data

  setUserToken(token)

  return token
}


