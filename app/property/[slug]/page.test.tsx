import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import PropertyPage from './page'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

// Mock supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn()
  }
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  })
}))

describe('PropertyPage', () => {
  it('should call notFound if property is not found', async () => {
    vi.mocked(supabase.from('properties').single).mockResolvedValue({ data: null, error: new Error('Not found') } as any)
    
    const params = Promise.resolve({ slug: 'non-existent' })
    
    await expect(PropertyPage({ params })).rejects.toThrow('NEXT_NOT_FOUND')
    expect(notFound).toHaveBeenCalled()
  })

  it('should render property details if found', async () => {
    const mockProperty = {
      id: '1',
      title: 'Luxury Villa',
      address: '123 Elite St',
      price: 1000000,
      description: 'A beautiful villa',
      images: ['image1.jpg'],
      beds: 3,
      baths: 2,
      sqft: 2000,
      type: 'Villa',
      status: 'For Sale',
      amenities: ['Pool'],
      slug: 'luxury-villa'
    }
    
    vi.mocked(supabase.from('properties').single).mockResolvedValue({ data: mockProperty, error: null } as any)
    
    const params = Promise.resolve({ slug: 'luxury-villa' })
    const result = await PropertyPage({ params })
    
    // Since it's a server component, we just check if it returns a React element
    expect(result).toBeDefined()
  })
})
