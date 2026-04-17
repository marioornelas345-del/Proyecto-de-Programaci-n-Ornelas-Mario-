'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signInWithGoogle, signInWithGitHub } from '@/lib/auth'
import { Button } from './ui/button'

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const urlError = searchParams.get('error')
    if (urlError) {
      if (urlError === 'auth-callback-failed') {
        setError('Registration failed during callback. This usually happens if cookies are disabled or the session expired.')
      } else if (urlError === 'access_denied') {
        setError('Access denied. You might have cancelled the registration.')
      } else {
        setError(urlError.replace(/_/g, ' '))
      }
    }
  }, [searchParams])

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setIsLoading(true)
    setError('')
    try {
      if (provider === 'google') {
        await signInWithGoogle()
      } else {
        await signInWithGitHub()
      }
    } catch (err: any) {
      setError(err.message || `Failed to sign up with ${provider}`)
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    // Implementation for email/password registration can go here
    setIsLoading(false)
    setError('Email registration is currently disabled. Please use Social Signup.')
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-soft border border-nordic-muted/10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-mosque/10 rounded-xl mb-4 text-mosque">
          <span className="material-icons">person_add</span>
        </div>
        <h2 className="text-3xl font-bold text-nordic-dark mb-2">Create Account</h2>
        <p className="text-nordic-muted">Join the elite world of LuxeEstate</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <Button 
          variant="outline" 
          className="h-12 flex items-center justify-center gap-2 border-nordic-muted/20 hover:bg-bg-light transition-all rounded-xl"
          onClick={() => handleOAuthSignIn('google')}
          disabled={isLoading}
        >
          <img src="/globe.svg" alt="Google" className="w-5 h-5 opacity-80" />
          <span className="font-semibold text-sm">Sign up with Google</span>
        </Button>

        <Button 
          variant="outline" 
          className="h-12 flex items-center justify-center gap-2 border-nordic-muted/20 hover:bg-bg-light transition-all rounded-xl"
          onClick={() => handleOAuthSignIn('github')}
          disabled={isLoading}
        >
          <img src="/window.svg" alt="GitHub" className="w-5 h-5 opacity-80" />
          <span className="font-semibold text-sm">Sign up with GitHub</span>
        </Button>
      </div>

      <div className="relative mb-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-nordic-muted/10"></div>
        </div>
        <div className="relative flex justify-center text-sm uppercase">
          <span className="bg-white px-4 text-nordic-muted font-medium">Or use email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-nordic-dark mb-2 ml-1" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="w-full h-12 px-4 rounded-xl border border-nordic-muted/20 focus:border-mosque focus:ring-1 focus:ring-mosque transition-all outline-none"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-nordic-dark mb-2 ml-1" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="w-full h-12 px-4 rounded-xl border border-nordic-muted/20 focus:border-mosque focus:ring-1 focus:ring-mosque transition-all outline-none"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-nordic-dark mb-2 ml-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full h-12 px-4 rounded-xl border border-nordic-muted/20 focus:border-mosque focus:ring-1 focus:ring-mosque transition-all outline-none"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-100 flex items-center gap-2">
            <span className="material-icons text-sm">error_outline</span>
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full h-12 bg-mosque hover:bg-opacity-95 text-white font-bold rounded-xl shadow-lg shadow-mosque/20 transition-all mt-4"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create Elite Account'}
        </Button>
      </form>
      
      <p className="mt-8 text-center text-sm text-nordic-muted">
        Already have an account?{' '}
        <a href="/auth/login" className="text-mosque font-bold hover:underline">
          Sign in here
        </a>
      </p>
    </div>
  )
}
