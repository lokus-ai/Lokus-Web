import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getStoredAuthCode, deleteAuthCode } from '../store-code/route.js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {
  try {
    const formData = await request.formData()
    
    const grantType = formData.get('grant_type')
    const clientId = formData.get('client_id')
    const code = formData.get('code')
    const redirectUri = formData.get('redirect_uri')
    const codeVerifier = formData.get('code_verifier')

    // Validate grant type
    if (grantType !== 'authorization_code') {
      return NextResponse.json({ 
        error: 'unsupported_grant_type', 
        error_description: 'Only authorization_code grant type is supported' 
      }, { status: 400 })
    }

    // Validate client
    if (clientId !== 'lokus-desktop') {
      return NextResponse.json({ 
        error: 'invalid_client', 
        error_description: 'Invalid client_id' 
      }, { status: 400 })
    }

    // Validate authorization code
    const storedCodeData = getStoredAuthCode(code)
    if (!storedCodeData) {
      return NextResponse.json({ 
        error: 'invalid_grant', 
        error_description: 'Invalid or expired authorization code' 
      }, { status: 400 })
    }

    // Check if code is expired
    if (Date.now() > storedCodeData.expiresAt) {
      deleteAuthCode(code)
      return NextResponse.json({ 
        error: 'invalid_grant', 
        error_description: 'Authorization code has expired' 
      }, { status: 400 })
    }

    // Verify PKCE
    if (!codeVerifier) {
      return NextResponse.json({ 
        error: 'invalid_request', 
        error_description: 'Missing code_verifier' 
      }, { status: 400 })
    }

    // Verify code challenge
    const challengeHash = crypto.createHash('sha256').update(codeVerifier).digest('base64url')
    if (challengeHash !== storedCodeData.codeChallenge) {
      return NextResponse.json({ 
        error: 'invalid_grant', 
        error_description: 'Invalid code_verifier' 
      }, { status: 400 })
    }

    // Verify redirect URI
    if (redirectUri !== storedCodeData.redirectUri) {
      return NextResponse.json({ 
        error: 'invalid_grant', 
        error_description: 'Redirect URI mismatch' 
      }, { status: 400 })
    }

    // Remove used authorization code
    deleteAuthCode(code)

    // Generate access token and refresh token
    const accessToken = crypto.randomBytes(32).toString('hex')
    const refreshToken = crypto.randomBytes(32).toString('hex')
    const expiresIn = 3600 // 1 hour

    // Store access token for profile endpoint
    const { storeAccessToken } = await import('../profile/route.js')
    storeAccessToken(accessToken, {
      userId: storedCodeData.userId,
      email: storedCodeData.email,
      name: storedCodeData.name,
      avatarUrl: storedCodeData.avatarUrl
    })

    // Store refresh token for refresh endpoint
    const { storeRefreshToken } = await import('../refresh/route.js')
    storeRefreshToken(refreshToken, {
      userId: storedCodeData.userId,
      email: storedCodeData.email,
      name: storedCodeData.name,
      avatarUrl: storedCodeData.avatarUrl,
      scope: storedCodeData.scope
    })

    return NextResponse.json({
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: expiresIn,
      user_id: storedCodeData.userId,
      scope: storedCodeData.scope
    })
  } catch (error) {
    console.error('OAuth token error:', error)
    return NextResponse.json({ 
      error: 'server_error', 
      error_description: 'Internal server error' 
    }, { status: 500 })
  }
}