import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract OAuth parameters
    const responseType = searchParams.get('response_type')
    const clientId = searchParams.get('client_id')
    const redirectUri = searchParams.get('redirect_uri')
    const scope = searchParams.get('scope')
    const state = searchParams.get('state')
    const codeChallenge = searchParams.get('code_challenge')
    const codeChallengeMethod = searchParams.get('code_challenge_method')

    // Validate required parameters
    if (!responseType || responseType !== 'code') {
      return NextResponse.json({ error: 'invalid_request', error_description: 'Invalid response_type' }, { status: 400 })
    }

    if (!clientId || clientId !== 'lokus-desktop') {
      return NextResponse.json({ error: 'invalid_client', error_description: 'Invalid client_id' }, { status: 400 })
    }

    if (!redirectUri || !redirectUri.startsWith('http://localhost:')) {
      return NextResponse.json({ error: 'invalid_request', error_description: 'Invalid redirect_uri' }, { status: 400 })
    }

    if (!state || !codeChallenge || codeChallengeMethod !== 'S256') {
      return NextResponse.json({ error: 'invalid_request', error_description: 'Missing PKCE parameters' }, { status: 400 })
    }

    // Store OAuth state in URL parameters for the login page
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect_uri', redirectUri)
    loginUrl.searchParams.set('state', state)
    loginUrl.searchParams.set('code_challenge', codeChallenge)
    loginUrl.searchParams.set('scope', scope || 'read write')

    // Redirect to login page with OAuth parameters
    return NextResponse.redirect(loginUrl.toString())
  } catch (error) {
    console.error('OAuth authorize error:', error)
    return NextResponse.json({ error: 'server_error', error_description: 'Internal server error' }, { status: 500 })
  }
}