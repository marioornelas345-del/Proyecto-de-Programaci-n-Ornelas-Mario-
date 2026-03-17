'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
  images: string[]
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0])

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-card border border-bg-light">
        <Image
          src={activeImage}
          alt="Property Gallery Main"
          fill
          className="object-cover transition-opacity duration-500"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(image)}
            className={`relative h-20 w-full rounded-lg overflow-hidden border-2 transition-all ${
              activeImage === image ? 'border-primary shadow-soft scale-105' : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={image}
              alt={`Property Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
