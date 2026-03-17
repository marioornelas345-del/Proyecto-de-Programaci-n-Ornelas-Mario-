import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FeaturedListings } from './FeaturedListings'

// Mock properties data
const mockProperties = [
  {
    id: '1',
    title: 'Featured Villa',
    price: 5000000,
    address: '123 Luxury St',
    beds: 4,
    baths: 3,
    sqft: 4000,
    isFeatured: true,
    images: ['https://example.com/image.jpg']
  }
]

describe('FeaturedListings', () => {
  it('renders correctly with properties', () => {
    render(<FeaturedListings properties={mockProperties} />)
    expect(screen.getByText('Featured Villa')).toBeInTheDocument()
    expect(screen.getByText('$5,000,000')).toBeInTheDocument()
  })

  it('renders empty state when no featured properties', () => {
    render(<FeaturedListings properties={[]} />)
    expect(screen.getByText('No featured properties available.')).toBeInTheDocument()
  })
})
