import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import crypto from 'crypto'

const SSO_SECRET = process.env.DISCOURSE_SSO_SECRET || 'your_sso_secret_here'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const sso = searchParams.get('sso')
  const sig = searchParams.get('sig')

  if (!sso || !sig) {
    return NextResponse.json({ error: 'Missing SSO parameters' }, { status: 400 })
  }

  // Verify the signature
  const expectedSig = crypto
    .createHmac('sha256', SSO_SECRET)
    .update(sso)
    .digest('hex')

  if (sig !== expectedSig) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
  }

  // Decode the SSO payload
  const payload = Buffer.from(sso, 'base64').toString('utf-8')
  const params = new URLSearchParams(payload)
  const nonce = params.get('nonce')
  const returnUrl = params.get('return_sso_url')

  if (!nonce || !returnUrl) {
    return NextResponse.json({ error: 'Invalid SSO payload' }, { status: 400 })
  }

  // Get the current user from Supabase
  const supabase = createServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    // Redirect to login with return URL
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Create the SSO response payload
  const responsePayload = new URLSearchParams({
    nonce,
    external_id: user.id,
    email: user.email!,
    username: user.user_metadata?.username || user.email!.split('@')[0],
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email!.split('@')[0],
    avatar_url: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
    require_activation: 'false'
  })

  // Encode and sign the response
  const base64Response = Buffer.from(responsePayload.toString()).toString('base64')
  const responseSignature = crypto
    .createHmac('sha256', SSO_SECRET)
    .update(base64Response)
    .digest('hex')

  // Redirect back to Discourse
  const redirectUrl = new URL(returnUrl)
  redirectUrl.searchParams.set('sso', base64Response)
  redirectUrl.searchParams.set('sig', responseSignature)

  return NextResponse.redirect(redirectUrl)
}

export async function POST(request: NextRequest) {
  // Handle logout requests from Discourse
  const { user_id } = await request.json()
  
  if (!user_id) {
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
  }

  // You can implement logout logic here if needed
  // For now, just return success
  return NextResponse.json({ success: true })
}