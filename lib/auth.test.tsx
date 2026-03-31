import { describe, it, expect, vi } from 'vitest'
import { signInWithGoogle, signInWithGitHub, signOut } from './auth'
import { supabase } from './supabase'

// Mock the supabase client
vi.mock('./supabase', () => ({
  supabase: {
    auth: {
      signInWithOAuth: vi.fn(),
      signOut: vi.fn()
    }
  }
}))

describe('Auth Utilities', () => {
  it('signInWithGoogle should call supabase.auth.signInWithOAuth with google provider', async () => {
    const mockResponse = { data: {}, error: null }
    vi.mocked(supabase.auth.signInWithOAuth).mockResolvedValue(mockResponse as any)

    await signInWithGoogle()

    expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
      options: {
        redirectTo: expect.any(String)
      }
    })
  })

  it('signInWithGitHub should call supabase.auth.signInWithOAuth with github provider', async () => {
    const mockResponse = { data: {}, error: null }
    vi.mocked(supabase.auth.signInWithOAuth).mockResolvedValue(mockResponse as any)

    await signInWithGitHub()

    expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'github',
      options: {
        redirectTo: expect.any(String)
      }
    })
  })

  it('signOut should call supabase.auth.signOut', async () => {
    vi.mocked(supabase.auth.signOut).mockResolvedValue({ error: null } as any)

    await signOut()

    expect(supabase.auth.signOut).toHaveBeenCalled()
  })
})
