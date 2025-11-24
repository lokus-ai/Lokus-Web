import crypto from 'crypto'

export interface DiscourseUser {
  external_id: string
  email: string
  username: string
  name: string
  avatar_url?: string
  require_activation?: string
  admin?: string
  moderator?: string
  groups?: string
  bio?: string
  website?: string
  location?: string
}

export class DiscourseSSOHelper {
  private secret: string

  constructor(secret: string) {
    this.secret = secret
  }

  /**
   * Validate the incoming SSO request signature
   */
  validateSignature(payload: string, signature: string): boolean {
    const expectedSignature = crypto
      .createHmac('sha256', this.secret)
      .update(payload)
      .digest('hex')
    
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    )
  }

  /**
   * Parse the SSO payload from Discourse
   */
  parsePayload(payload: string): { nonce: string; return_sso_url: string } {
    const decoded = Buffer.from(payload, 'base64').toString('utf-8')
    const params = new URLSearchParams(decoded)
    
    return {
      nonce: params.get('nonce') || '',
      return_sso_url: params.get('return_sso_url') || ''
    }
  }

  /**
   * Generate SSO response for user authentication
   */
  generateResponse(user: DiscourseUser, nonce: string): { payload: string; signature: string } {
    const params = new URLSearchParams({
      nonce,
      external_id: user.external_id,
      email: user.email,
      username: user.username,
      name: user.name,
      require_activation: user.require_activation || 'false'
    })

    // Add optional fields if provided
    if (user.avatar_url) params.set('avatar_url', user.avatar_url)
    if (user.admin) params.set('admin', user.admin)
    if (user.moderator) params.set('moderator', user.moderator)
    if (user.groups) params.set('groups', user.groups)
    if (user.bio) params.set('bio', user.bio)
    if (user.website) params.set('website', user.website)
    if (user.location) params.set('location', user.location)

    const payload = Buffer.from(params.toString()).toString('base64')
    const signature = crypto
      .createHmac('sha256', this.secret)
      .update(payload)
      .digest('hex')

    return { payload, signature }
  }

  /**
   * Generate forum login URL with proper SSO parameters
   */
  generateForumLoginUrl(baseUrl: string, returnPath: string = '/'): string {
    const nonce = crypto.randomBytes(16).toString('hex')
    const returnSsoUrl = `${baseUrl}/session/sso_login`
    
    const params = new URLSearchParams({
      nonce,
      return_sso_url: returnSsoUrl
    })

    const payload = Buffer.from(params.toString()).toString('base64')
    const signature = crypto
      .createHmac('sha256', this.secret)
      .update(payload)
      .digest('hex')

    return `${baseUrl}/session/sso?sso=${encodeURIComponent(payload)}&sig=${signature}`
  }
}

// Export a configured instance
export const discourseSSOHelper = new DiscourseSSOHelper(
  process.env.DISCOURSE_SSO_SECRET || 'your_sso_secret_here'
)