import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ImageGallery } from './ImageGallery'

const mockImages = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
]

describe('ImageGallery', () => {
  it('renders correctly with images', () => {
    render(<ImageGallery images={mockImages} />)
    expect(screen.getAllByRole('img')).toHaveLength(4) // 1 main + 3 thumbnails
  })

  it('changes main image when thumbnail is clicked', () => {
    render(<ImageGallery images={mockImages} />)
    const thumbnails = screen.getAllByRole('button')
    fireEvent.click(thumbnails[1]) // Click second thumbnail
    const mainImage = screen.getAllByRole('img')[0]
    expect(mainImage).toHaveAttribute('src', expect.stringContaining('image2.jpg'))
  })
})
