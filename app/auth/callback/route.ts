import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

// Use env var to get the correct base URL (avoids localhost when behind Cloudflare Tunnel)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.lokusmd.com'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  // OAuth parameters from the desktop app flow
  const redirectUri = searchParams.get('redirect_uri')
  const state = searchParams.get('state')
  const codeChallenge = searchParams.get('code_challenge')
  const scope = searchParams.get('scope')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.session) {
      // Check if this is an OAuth flow from the desktop app
      if (redirectUri && state && codeChallenge) {
        // Generate authorization code for OAuth flow
        const authCode = crypto.randomUUID()

        try {
          // Store the authorization code with user data
          const storeResponse = await fetch(`${BASE_URL}/api/auth/store-code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code: authCode,
              codeChallenge: codeChallenge,
              redirectUri: redirectUri,
              state: state,
              userId: data.session.user.id,
              email: data.session.user.email,
              name: data.session.user.user_metadata?.full_name || data.session.user.email,
              avatarUrl: data.session.user.user_metadata?.avatar_url,
              scope: scope || 'read write'
            })
          })

          if (!storeResponse.ok) {
            throw new Error('Failed to store authorization code')
          }

          // Redirect to the app with authorization code
          const params = new URLSearchParams({
            code: authCode,
            state: state
          })

          return NextResponse.redirect(`${redirectUri}?${params.toString()}`)
        } catch (error) {
          console.error('OAuth callback error:', error)
          return NextResponse.redirect(`${BASE_URL}/auth/auth-code-error`)
        }
      }

      // Regular web redirect
      return NextResponse.redirect(`${BASE_URL}${next}`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${BASE_URL}/auth/auth-code-error`)
}