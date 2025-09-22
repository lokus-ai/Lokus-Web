import { NextResponse } from 'next/server'

// In-memory storage for authorization codes (in production, use Redis or database)
const authCodes = new Map()

export async function POST(request) {
  try {
    const body = await request.json()
    
    const {
      code,
      codeChallenge,
      redirectUri,
      state,
      userId,
      email,
      name,
      avatarUrl,
      scope
    } = body

    // Validate required fields
    if (!code || !codeChallenge || !redirectUri || !state || !userId) {
      return NextResponse.json({ 
        error: 'missing_parameters', 
        error_description: 'Required parameters are missing' 
      }, { status: 400 })
    }

    // Store authorization code data
    const codeData = {
      codeChallenge,
      redirectUri,
      state,
      userId,
      email,
      name,
      avatarUrl,
      scope: scope || 'read write',
      createdAt: Date.now(),
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    }

    authCodes.set(code, codeData)
    
    // Auto-cleanup after expiration
    setTimeout(() => {
      authCodes.delete(code)
    }, 10 * 60 * 1000)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Store code error:', error)
    return NextResponse.json({ 
      error: 'server_error', 
      error_description: 'Internal server error' 
    }, { status: 500 })
  }
}

// Export function to be used by token endpoint
export function getStoredAuthCode(code) {
  return authCodes.get(code)
}

export function deleteAuthCode(code) {
  authCodes.delete(code)
}