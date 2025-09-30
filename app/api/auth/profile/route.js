import { NextResponse } from 'next/server'
import { getStoredAccessToken } from '@/lib/auth-store'

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ 
        error: 'invalid_token', 
        error_description: 'Missing or invalid authorization header' 
      }, { status: 401 })
    }

    const accessToken = authHeader.substring(7) // Remove "Bearer " prefix
    
    // Validate the token
    const tokenData = getStoredAccessToken(accessToken)
    if (!tokenData) {
      return NextResponse.json({ 
        error: 'invalid_token', 
        error_description: 'Invalid or expired access token' 
      }, { status: 401 })
    }

    // Check token expiration
    if (Date.now() > tokenData.expiresAt) {
      return NextResponse.json({ 
        error: 'invalid_token', 
        error_description: 'Access token has expired' 
      }, { status: 401 })
    }

    // Return user profile
    return NextResponse.json({
      id: tokenData.userId,
      email: tokenData.email,
      name: tokenData.name,
      avatar_url: tokenData.avatarUrl
    })
  } catch (error) {
    console.error('Profile API error:', error)
    return NextResponse.json({ 
      error: 'server_error', 
      error_description: 'Internal server error' 
    }, { status: 500 })
  }
}