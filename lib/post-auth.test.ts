import { describe, it, expect, vi } from 'vitest'
import { getPostAuthRedirect } from './post-auth'

describe('Post-Auth Logic', () => {
  it('should redirect new users to the profile setup flow', () => {
    const userMetadata = {
      is_new_user: true
    }
    const redirectUrl = getPostAuthRedirect(userMetadata)
    expect(redirectUrl).toBe('/auth/profile-setup')
  })

  it('should redirect returning users to the dashboard', () => {
    const userMetadata = {
      is_new_user: false
    }
    const redirectUrl = getPostAuthRedirect(userMetadata)
    expect(redirectUrl).toBe('/dashboard')
  })

  it('should redirect users without metadata to the dashboard by default', () => {
    const userMetadata = {}
    const redirectUrl = getPostAuthRedirect(userMetadata)
    expect(redirectUrl).toBe('/dashboard')
  })
})
