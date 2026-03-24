import { describe, it, expect } from 'vitest'

describe('Supabase Client', () => {
  it('should be initialized', async () => {
    // Set environment variables before dynamic import
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'example-anon-key'
    
    const { supabase } = await import('./supabase')
    expect(supabase).toBeDefined()
  })
})
