'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createPublisher(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('Not authenticated')
    }

    const handle = formData.get('handle') as string
    const displayName = formData.get('displayName') as string
    const contactEmail = formData.get('contactEmail') as string
    const githubHandle = formData.get('githubHandle') as string
    const websiteUrl = formData.get('websiteUrl') as string

    if (!handle || !displayName) {
        return { error: 'Handle and Display Name are required' }
    }

    // Validate handle format
    if (!/^[a-z0-9_-]+$/.test(handle)) {
        return { error: 'Handle can only contain lowercase letters, numbers, underscores, and hyphens' }
    }

    const { error } = await supabase
        .from('publishers')
        .insert({
            id: handle,
            owner_id: user.id,
            display_name: displayName,
            contact_email: contactEmail,
            github_handle: githubHandle,
            website_url: websiteUrl,
        })

    if (error) {
        if (error.code === '23505') { // Unique violation
            return { error: 'Handle already taken' }
        }
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function createToken(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('Not authenticated')
    }

    const label = formData.get('label') as string
    if (!label) {
        throw new Error('Label is required')
    }

    // Get publisher ID
    const { data: publisher } = await supabase
        .from('publishers')
        .select('id')
        .eq('owner_id', user.id)
        .single()

    if (!publisher) {
        throw new Error('Publisher profile not found')
    }

    // Generate token
    const token = `lokus_pat_${crypto.randomUUID().replace(/-/g, '')}`

    // Hash token (simple SHA-256 for now, in production use bcrypt/argon2)
    // Note: In a real app, use a proper hashing library. 
    // For this MVP, we'll store it directly or use a simple web crypto hash if possible, 
    // but since this is server-side node, we can use 'crypto'.
    const { createHash } = await import('crypto')
    const keyHash = createHash('sha256').update(token).digest('hex')

    const { error } = await supabase
        .from('api_keys')
        .insert({
            publisher_id: publisher.id,
            key_hash: keyHash,
            label: label,
        })

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/dashboard/settings/tokens')
    return { success: true, token: token }
}

export async function deleteToken(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('Not authenticated')
    }

    const id = formData.get('id') as string
    if (!id) return

    // Verify ownership via RLS, but explicit check doesn't hurt
    const { data: publisher } = await supabase
        .from('publishers')
        .select('id')
        .eq('owner_id', user.id)
        .single()

    if (!publisher) return

    await supabase
        .from('api_keys')
        .delete()
        .eq('id', id)
        .eq('publisher_id', publisher.id)

    revalidatePath('/dashboard/settings/tokens')
}
