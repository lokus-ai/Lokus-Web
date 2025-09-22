import { NextResponse } from 'next/server'
import crypto from 'crypto'

// In-memory token storage (in production, use Redis or database)
const refreshTokens = new Map()

export async function POST(request) {
  try {
    const formData = await request.formData()
    
    const grantType = formData.get('grant_type')
    const clientId = formData.get('client_id')
    const refreshToken = formData.get('refresh_token')

    // Validate grant type
    if (grantType !== 'refresh_token') {
      return NextResponse.json({ 
        error: 'unsupported_grant_type', 
        error_description: 'Only refresh_token grant type is supported' 
      }, { status: 400 })
    }

    // Validate client
    if (clientId !== 'lokus-desktop') {
      return NextResponse.json({ 
        error: 'invalid_client', 
        error_description: 'Invalid client_id' 
      }, { status: 400 })
    }

    // Validate refresh token
    const storedTokenData = refreshTokens.get(refreshToken)
    if (!storedTokenData) {
      return NextResponse.json({ 
        error: 'invalid_grant', 
        error_description: 'Invalid or expired refresh token' 
      }, { status: 400 })
    }

    // Check token expiration (refresh tokens typically last 30 days)
    if (Date.now() > storedTokenData.expiresAt) {
      refreshTokens.delete(refreshToken)
      return NextResponse.json({ 
        error: 'invalid_grant', 
        error_description: 'Refresh token has expired' 
      }, { status: 400 })
    }

    // Generate new access token
    const newAccessToken = crypto.randomBytes(32).toString('hex')
    const newRefreshToken = crypto.randomBytes(32).toString('hex')
    const expiresIn = 3600 // 1 hour

    // Store new refresh token
    const newTokenData = {
      ...storedTokenData,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
    }
    refreshTokens.set(newRefreshToken, newTokenData)
    
    // Remove old refresh token
    refreshTokens.delete(refreshToken)

    // Store new access token for profile endpoint
    const { storeAccessToken } = await import('../profile/route.js')
    storeAccessToken(newAccessToken, {
      userId: storedTokenData.userId,
      email: storedTokenData.email,
      name: storedTokenData.name,
      avatarUrl: storedTokenData.avatarUrl
    })

    return NextResponse.json({
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      token_type: 'Bearer',
      expires_in: expiresIn,
      scope: storedTokenData.scope
    })
  } catch (error) {
    console.error('Refresh token error:', error)
    return NextResponse.json({ 
      error: 'server_error', 
      error_description: 'Internal server error' 
    }, { status: 500 })
  }
}

// Helper function to store refresh tokens (called from token endpoint)
export function storeRefreshToken(token, userData) {
  const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
  refreshTokens.set(token, { ...userData, expiresAt })
  
  // Clean up expired tokens
  setTimeout(() => {
    refreshTokens.delete(token)
  }, 30 * 24 * 60 * 60 * 1000)
}