// In-memory storage for auth codes and tokens
// In production, use Redis or database

const authCodes = new Map()
const accessTokens = new Map()
const refreshTokens = new Map()

// Auth code functions
export function storeAuthCode(code, data) {
  const expiresAt = Date.now() + 600 * 1000 // 10 minutes
  authCodes.set(code, { ...data, expiresAt })
  
  // Clean up expired codes
  setTimeout(() => {
    authCodes.delete(code)
  }, 600 * 1000)
}

export function getStoredAuthCode(code) {
  return authCodes.get(code)
}

export function deleteAuthCode(code) {
  authCodes.delete(code)
}

// Access token functions
export function storeAccessToken(token, userData) {
  const expiresAt = Date.now() + 3600 * 1000 // 1 hour
  accessTokens.set(token, { ...userData, expiresAt })
  
  // Clean up expired tokens
  setTimeout(() => {
    accessTokens.delete(token)
  }, 3600 * 1000)
}

export function getStoredAccessToken(token) {
  return accessTokens.get(token)
}

export function deleteAccessToken(token) {
  accessTokens.delete(token)
}

// Refresh token functions
export function storeRefreshToken(token, userData) {
  const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
  refreshTokens.set(token, { ...userData, expiresAt })
  
  // Clean up expired tokens
  setTimeout(() => {
    refreshTokens.delete(token)
  }, 30 * 24 * 60 * 60 * 1000)
}

export function getStoredRefreshToken(token) {
  return refreshTokens.get(token)
}

export function deleteRefreshToken(token) {
  refreshTokens.delete(token)
}