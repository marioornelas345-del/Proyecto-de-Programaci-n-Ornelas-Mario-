import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SignupForm } from './SignupForm'
import { signInWithGoogle, signInWithGitHub } from '@/lib/auth'

// Mock the auth functions
vi.mock('@/lib/auth', () => ({
  signInWithGoogle: vi.fn(),
  signInWithGitHub: vi.fn(),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}))

describe('SignupForm', () => {
  it('should render the signup form', () => {
    render(<SignupForm />)
    expect(screen.getByText(/Create Account/i)).toBeDefined()
    expect(screen.getByText(/Join the elite world of LuxeEstate/i)).toBeDefined()
  })

  it('should call signInWithGoogle when Google button is clicked', () => {
    render(<SignupForm />)
    const googleButton = screen.getByRole('button', { name: /Sign up with Google/i })
    fireEvent.click(googleButton)
    expect(signInWithGoogle).toHaveBeenCalled()
  })

  it('should call signInWithGitHub when GitHub button is clicked', () => {
    render(<SignupForm />)
    const githubButton = screen.getByRole('button', { name: /Sign up with GitHub/i })
    fireEvent.click(githubButton)
    expect(signInWithGitHub).toHaveBeenCalled()
  })
})
