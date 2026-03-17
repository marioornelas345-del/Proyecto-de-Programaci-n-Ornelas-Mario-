import React from 'react'
import Image from 'next/image'
import { Button } from './Button'

interface HeroProps {
  title: string
  subtitle?: string
  ctaText?: string
  onCtaClick?: () => void
  backgroundImage?: string
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  onCtaClick,
  backgroundImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
}) => {
  return (
    <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Luxury Home Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-bg-dark/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-bg-light mb-8 drop-shadow-md">
            {subtitle}
          </p>
        )}
        {ctaText && (
          <Button 
            size="lg" 
            onClick={onCtaClick}
            className="shadow-card"
          >
            {ctaText}
          </Button>
        )}
      </div>
    </div>
  )
}
