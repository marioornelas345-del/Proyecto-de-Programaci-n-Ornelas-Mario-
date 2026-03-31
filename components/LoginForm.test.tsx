import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { LoginForm } from './LoginForm'
import { signInWithGoogle, signInWithGitHub } from '@/lib/auth'

// Mock the auth functions
vi.mock('@/lib/auth', () => ({
  signInWithGoogle: vi.fn(),
  signInWithGitHub: vi.fn()
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}))

describe('LoginForm', () => {
  it('should render the login form', () => {
    render(<LoginForm />)
    expect(screen.getByText(/Welcome Back/i)).toBeDefined()
    expect(screen.getByText(/Sign in to your account/i)).toBeDefined()
  })

  it('should call signInWithGoogle when Google button is clicked', () => {
    render(<LoginForm />)
    const googleButton = screen.getByRole('button', { name: /Continue with Google/i })
    fireEvent.click(googleButton)
    expect(signInWithGoogle).toHaveBeenCalled()
  })

  it('should call signInWithGitHub when GitHub button is clicked', () => {
    render(<LoginForm />)
    const githubButton = screen.getByRole('button', { name: /Continue with GitHub/i })
    fireEvent.click(githubButton)
    expect(signInWithGitHub).toHaveBeenCalled()
  })
})
