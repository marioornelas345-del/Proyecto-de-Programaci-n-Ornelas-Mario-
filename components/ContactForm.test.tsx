import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ContactForm } from './ContactForm'

describe('ContactForm', () => {
  it('renders all fields correctly', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send inquiry/i })).toBeInTheDocument()
  })

  it('shows error when submitting empty fields', () => {
    render(<ContactForm />)
    fireEvent.click(screen.getByRole('button', { name: /send inquiry/i }))
    // Assuming simple validation check
    expect(screen.getByText(/name is required/i)).toBeInTheDocument()
  })
})
