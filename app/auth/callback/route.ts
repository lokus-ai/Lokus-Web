import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  const redirect = searchParams.get('redirect')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.session) {
      const { access_token, refresh_token, expires_at, user } = data.session
      
      // Check if this is a redirect to the Lokus app
      if (redirect && redirect.startsWith('lokus://auth-callback')) {
        const params = new URLSearchParams({
          token: access_token,
          refresh_token: refresh_token || '',
          expires_in: expires_at ? String(Math.floor((expires_at * 1000 - Date.now()) / 1000)) : '',
          user_id: user.id
        })
        
        return NextResponse.redirect(`lokus://auth-callback?${params.toString()}`)
      }
      
      // Regular web redirect
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}