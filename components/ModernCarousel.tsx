'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface ModernCarouselProps {
  images: string[]
  title: string
  isExclusive?: boolean
  isNewArrival?: boolean
}

export const ModernCarousel: React.FC<ModernCarouselProps> = ({ 
  images, 
  title, 
  isExclusive, 
  isNewArrival 
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bg-light flex items-center justify-center border border-nordic-muted/10">
        <span className="material-icons text-6xl text-nordic-muted/20">image</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Feature Image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-soft group bg-white">
        <Image 
          src={images[activeIndex]} 
          alt={`${title} - View ${activeIndex + 1}`} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className="bg-mosque text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            {isExclusive ? 'Exclusive' : 'Premium'}
          </span>
          {isNewArrival && (
            <span className="bg-white/90 backdrop-blur text-nordic text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              New
            </span>
          )}
        </div>

        {/* View All Overlay Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-nordic px-4 py-2 rounded-xl text-sm font-bold shadow-lg backdrop-blur transition-all flex items-center gap-2 border border-nordic-muted/10 z-10"
        >
          <span className="material-icons text-sm">grid_view</span>
          View All {images.length} Photos
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-nordic opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10 shadow-md"
            >
              <span className="material-icons">chevron_left</span>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-nordic opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10 shadow-md"
            >
              <span className="material-icons">chevron_right</span>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-none w-48 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all snap-start border-2 ${
                activeIndex === idx 
                  ? 'border-mosque ring-4 ring-mosque/10 shadow-md scale-[0.98]' 
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image 
                src={img} 
                alt={`${title} thumb ${idx + 1}`} 
                width={200} 
                height={150} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Gallery Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-nordic/95 backdrop-blur-xl flex flex-col">
          <div className="p-6 flex justify-between items-center text-white">
            <h3 className="font-bold">{title} - Full Gallery</h3>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <span className="material-icons">close</span>
            </button>
          </div>
          
          <div className="flex-grow relative flex items-center justify-center p-4 md:p-12">
            <div className="relative w-full h-full max-w-6xl">
              <Image 
                src={images[activeIndex]} 
                alt={`${title} fullscreen`} 
                fill 
                className="object-contain"
              />
            </div>

            {/* Modal Navigation */}
            <button 
              onClick={() => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-8 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <span className="material-icons text-3xl">chevron_left</span>
            </button>
            <button 
              onClick={() => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="absolute right-8 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <span className="material-icons text-3xl">chevron_right</span>
            </button>
          </div>

          <div className="p-8 flex gap-4 overflow-x-auto justify-center scrollbar-hide">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`flex-none w-24 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                  activeIndex === idx ? 'border-mosque scale-110 shadow-lg' : 'border-transparent opacity-50'
                }`}
              >
                <Image src={img} alt="thumb" width={100} height={75} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
