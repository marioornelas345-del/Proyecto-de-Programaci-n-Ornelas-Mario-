'use client'

import React from 'react'

interface AmenitiesSelectorProps {
  selected: string[]
  onChange: (amenities: string[]) => void
}

const COMMON_AMENITIES = [
  'Pool', 'Gym', 'Home Theater', 'Wine Cellar', 'Private Dock', 
  'Guest House', 'Garden', 'Security', 'Gourmet Kitchen', 
  'Smart Home', 'Infinity Pool', 'Helipad', 'Tennis Court'
]

export const AmenitiesSelector: React.FC<AmenitiesSelectorProps> = ({ selected, onChange }) => {
  const toggleAmenity = (amenity: string) => {
    if (selected.includes(amenity)) {
      onChange(selected.filter(a => a !== amenity))
    } else {
      onChange([...selected, amenity])
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-bold text-nordic-dark uppercase tracking-wider ml-1">Amenities</label>
      <div className="flex flex-wrap gap-2">
        {COMMON_AMENITIES.map((amenity) => (
          <button
            key={amenity}
            type="button"
            onClick={() => toggleAmenity(amenity)}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
              selected.includes(amenity)
                ? 'bg-mosque text-white border-mosque'
                : 'bg-transparent text-nordic-muted border-nordic-muted/20 hover:border-mosque/30'
            }`}
          >
            {amenity}
          </button>
        ))}
      </div>
    </div>
  )
}
