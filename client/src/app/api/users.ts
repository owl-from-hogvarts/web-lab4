import { setUserToken } from "app/auth/auth"
import api from "./api"

export type TLoginData = {
  login: string,
  password: string,
}

type TLoginUserResponse = {
  UUID: string
}

export async function loginUser(data: TLoginData): Promise<string> {
  const response = await api.get<TLoginUserResponse>("/users", {
    params: data
  })
  const { UUID } = response.data
  setUserToken(UUID)

  return UUID
}


