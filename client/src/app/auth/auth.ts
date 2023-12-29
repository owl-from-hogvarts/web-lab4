
// impossible to use hooks within router
// therefore can't use react context api 
// to store token
const KEY_USER_TOKEN = "user_token"

let userToken: string | null = window.localStorage.getItem(KEY_USER_TOKEN)

export function setUserToken(token: string | null) {
  if (token == null) {
    window.localStorage.removeItem(KEY_USER_TOKEN)
  } else {
    window.localStorage.setItem(KEY_USER_TOKEN, token?.toString())
  }
  userToken = token
}

export default function getUserToken() {
  return userToken
}

export function isAuthorized() {
  return userToken !== null
}
