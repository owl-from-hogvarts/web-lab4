
// impossible to use hooks within router
// therefore can't use react context api 
// to store token

let userToken: string | null = null

export function setUserToken(token: string) {
  userToken = token
}

export default function getUserToken() {
  return userToken
}

export function isAuthorized() {
  return userToken !== null
}
