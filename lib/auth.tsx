import { supabase } from './supabase'

/**
 * Sign in with Google using Supabase OAuth
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })

  if (error) {
    console.error('Error signing in with Google:', error.message)
    throw error
  }

  return data
}

/**
 * Sign in with GitHub using Supabase OAuth
 */
export async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })

  if (error) {
    console.error('Error signing in with GitHub:', error.message)
    throw error
  }

  return data
}

/**
 * Sign out from Supabase
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error signing out:', error.message)
    throw error
  }
}

/**
 * Get the current user session
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Error getting session:', error.message)
    return null
  }
  
  return session
}
