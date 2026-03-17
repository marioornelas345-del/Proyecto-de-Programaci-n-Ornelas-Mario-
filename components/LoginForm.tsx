'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Button } from './Button'
import { Input } from './Input'
import { Card } from './Card'

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login(formData.email, formData.password)
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-nordic-dark mb-6 text-center">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          id="email"
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          id="password"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <Button 
          type="submit" 
          className="w-full py-3"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </Button>
      </form>
    </Card>
  )
}
