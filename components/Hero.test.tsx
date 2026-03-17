import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders title and subtitle correctly', () => {
    render(
      <Hero 
        title="Find Your Dream Luxury Home" 
        subtitle="Experience the peak of elite living"
      />
    )
    expect(screen.getByText('Find Your Dream Luxury Home')).toBeInTheDocument()
    expect(screen.getByText('Experience the peak of elite living')).toBeInTheDocument()
  })

  it('renders CTA button when provided', () => {
    render(
      <Hero 
        title="Title" 
        ctaText="Browse Listings"
      />
    )
    expect(screen.getByRole('button')).toHaveTextContent('Browse Listings')
  })
})
