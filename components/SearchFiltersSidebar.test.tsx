import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SearchFiltersSidebar } from './SearchFiltersSidebar'

// Mock next/navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams(''),
}))

describe('SearchFiltersSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the filter sections', () => {
    render(<SearchFiltersSidebar />)
    expect(screen.getByText(/Filters/i)).toBeDefined()
    expect(screen.getByText(/Property Type/i)).toBeDefined()
    expect(screen.getByText(/Price Range/i)).toBeDefined()
    expect(screen.getByText(/Amenities/i)).toBeDefined()
  })

  it('should update URL when a property type is clicked', () => {
    render(<SearchFiltersSidebar />)
    const villaButton = screen.getByText('Villa')
    fireEvent.click(villaButton)
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('type=Villa'), { scroll: false })
  })

  it('should update URL when price is entered', () => {
    render(<SearchFiltersSidebar />)
    const minPriceInput = screen.getByPlaceholderText('Min Price')
    fireEvent.change(minPriceInput, { target: { value: '1000000' } })
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('minPrice=1000000'), { scroll: false })
  })

  it('should update URL when an amenity is toggled', () => {
    render(<SearchFiltersSidebar />)
    const poolCheckbox = screen.getByLabelText('Pool')
    fireEvent.click(poolCheckbox)
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('amenities=Pool'), { scroll: false })
  })

  it('should reset all filters when Reset All is clicked', () => {
    render(<SearchFiltersSidebar />)
    const resetButton = screen.getByText('Reset All')
    fireEvent.click(resetButton)
    expect(mockPush).toHaveBeenCalledWith('/search', { scroll: false })
  })
})
