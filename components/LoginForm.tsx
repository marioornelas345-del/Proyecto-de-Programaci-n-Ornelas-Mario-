'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithGoogle, signInWithGitHub } from '@/lib/auth'
import { Button } from './ui/button'

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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
      setError(err.message || `Failed to sign in with ${provider}`)
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    // Implementation for email/password can go here
    setIsLoading(false)
    setError('Email/password login is currently disabled. Please use Social Login.')
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-soft border border-nordic-muted/10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-mosque/10 rounded-xl mb-4 text-mosque">
          <span className="material-icons">diamond</span>
        </div>
        <h2 className="text-3xl font-bold text-nordic-dark mb-2">Welcome Back</h2>
        <p className="text-nordic-muted">Sign in to your account to continue</p>
      </div>

      <div className="space-y-4 mb-10">
        <Button 
          variant="outline" 
          className="w-full h-12 flex items-center justify-center gap-3 border-nordic-muted/20 hover:bg-bg-light transition-all rounded-xl"
          onClick={() => handleOAuthSignIn('google')}
          disabled={isLoading}
        >
          <img src="/globe.svg" alt="Google" className="w-5 h-5 opacity-80" />
          <span className="font-semibold text-nordic-dark">Continue with Google</span>
        </Button>

        <Button 
          variant="outline" 
          className="w-full h-12 flex items-center justify-center gap-3 border-nordic-muted/20 hover:bg-bg-light transition-all rounded-xl"
          onClick={() => handleOAuthSignIn('github')}
          disabled={isLoading}
        >
          <img src="/window.svg" alt="GitHub" className="w-5 h-5 opacity-80" />
          <span className="font-semibold text-nordic-dark">Continue with GitHub</span>
        </Button>
      </div>

      <div className="relative mb-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-nordic-muted/10"></div>
        </div>
        <div className="relative flex justify-center text-sm uppercase">
          <span className="bg-white px-4 text-nordic-muted font-medium">Or continue with</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          className="w-full h-12 bg-mosque hover:bg-opacity-95 text-white font-bold rounded-xl shadow-lg shadow-mosque/20 transition-all"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
      
      <p className="mt-8 text-center text-sm text-nordic-muted">
        Don&apos;t have an account?{' '}
        <a href="/auth/signup" className="text-mosque font-bold hover:underline">
          Create one now
        </a>
      </p>
    </div>
  )
}
