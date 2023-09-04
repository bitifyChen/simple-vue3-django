// 獲取 access token
export function getAccessToken() {
  return localStorage.getItem('token')
}

// 獲取 refresh token
export function getRefreshToken() {
  return localStorage.getItem('refresh_token')
}

// 設置 access token
export function setAccessToken(token) {
  localStorage.setItem('token', token)
}

// 設置 refresh token
export function setRefreshToken(token) {
  localStorage.setItem('refresh_token', token)
}

// 移除 access token 和 refresh token
export function removeTokens() {
  localStorage.removeItem('token')
  localStorage.removeItem('refresh_token')
}
