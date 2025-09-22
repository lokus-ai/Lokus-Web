import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// In-memory token storage (in production, use Redis or database)
const accessTokens = new Map()

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
    
    // In production, validate the token against your database
    // For now, we'll use a simple token validation
    const tokenData = accessTokens.get(accessToken)
    if (!tokenData) {
      return NextResponse.json({ 
        error: 'invalid_token', 
        error_description: 'Invalid or expired access token' 
      }, { status: 401 })
    }

    // Check token expiration
    if (Date.now() > tokenData.expiresAt) {
      accessTokens.delete(accessToken)
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

// Helper function to store access tokens (called after token exchange)
export function storeAccessToken(token, userData) {
  const expiresAt = Date.now() + 3600 * 1000 // 1 hour
  accessTokens.set(token, { ...userData, expiresAt })
  
  // Clean up expired tokens
  setTimeout(() => {
    accessTokens.delete(token)
  }, 3600 * 1000)
}