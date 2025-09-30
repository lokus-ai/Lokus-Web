import { NextResponse } from 'next/server'
import { storeAuthCode } from '@/lib/auth-store'

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
    storeAuthCode(code, {
      codeChallenge,
      redirectUri,
      state,
      userId,
      email,
      name,
      avatarUrl,
      scope: scope || 'read write'
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Store code error:', error)
    return NextResponse.json({ 
      error: 'server_error', 
      error_description: 'Internal server error' 
    }, { status: 500 })
  }
}