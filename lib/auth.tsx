'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react'
import { createBrowserSupabase } from '@/lib/supabase'

// Define the shape of the authentication context
interface AuthContextType {
  user: any | null
  session: any | null
  isLoading: boolean
  signOut: () => Promise<void>
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  session: null, 
  isLoading: true,
  signOut: async () => {} 
})

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext)

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null)
  const [session, setSession] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Memoize the supabase client so it doesn't change between renders
  const supabase = useMemo(() => createBrowserSupabase(), [])

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true)
      const { data: { session: currentSession }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error fetching session:', error.message)
      } else {
        setSession(currentSession)
        setUser(currentSession?.user ?? null)
      }
      setIsLoading(false)
    }

    fetchSession()

    // Set up a listener for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
    })

    // Cleanup listener on component unmount
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Sign in with Google using Supabase OAuth
 */
export async function signInWithGoogle() {
  const supabase = createBrowserSupabase()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    }
  })

  if (error) {
    console.error('Error signing in with Google:', error.message)
    throw error
  }
}

/**
 * Sign in with GitHub using Supabase OAuth
 */
export async function signInWithGitHub() {
  const supabase = createBrowserSupabase()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })

  if (error) {
    console.error('Error signing in with GitHub:', error.message)
    throw error
  }
}

/**
 * Sign out from Supabase
 */
export async function signOut() {
  const supabase = createBrowserSupabase()
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
  const supabase = createBrowserSupabase()
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Error getting session:', error.message)
    return null
  }
  
  return session
}
