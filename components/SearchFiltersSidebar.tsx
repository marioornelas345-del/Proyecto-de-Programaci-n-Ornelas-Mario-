'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'

const PROPERTY_TYPES = ['All', 'Villa', 'Penthouse', 'Mansion', 'Estate', 'Apartment']
const AMENITIES_LIST = ['Pool', 'Gym', 'Home Theater', 'Wine Cellar', 'Private Dock', 'Guest House', 'Garden', 'Security']

export const SearchFiltersSidebar: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || 'All',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    beds: searchParams.get('beds') || '',
    baths: searchParams.get('baths') || '',
    amenities: searchParams.getAll('amenities') || []
  })

  // Sync state with URL changes
  useEffect(() => {
    setFilters({
      type: searchParams.get('type') || 'All',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      beds: searchParams.get('beds') || '',
      baths: searchParams.get('baths') || '',
      amenities: searchParams.getAll('amenities') || []
    })
  }, [searchParams])

  const updateURL = (newFilters: any) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (key === 'amenities') {
        params.delete(key)
        ;(value as string[]).forEach(item => params.append(key, item))
      } else if (value) {
        params.set(key, value as string)
      } else {
        params.delete(key)
      }
    })

    router.push(`/search?${params.toString()}`, { scroll: false })
  }

  const handleTypeChange = (type: string) => {
    const newFilters = { ...filters, type }
    setFilters(newFilters)
    updateURL(newFilters)
  }

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity]
    
    const newFilters = { ...filters, amenities: newAmenities }
    setFilters(newFilters)
    updateURL(newFilters)
  }

  const clearFilters = () => {
    setFilters({
      type: 'All',
      minPrice: '',
      maxPrice: '',
      beds: '',
      baths: '',
      amenities: []
    })
    router.push('/search', { scroll: false })
  }

  return (
    <div className="w-full lg:w-80 bg-white rounded-2xl shadow-soft border border-nordic-muted/10 p-6 h-fit sticky top-24">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-nordic-dark">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-mosque font-semibold hover:underline"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-8">
        {/* Property Type */}
        <div>
          <label className="block text-sm font-bold text-nordic-dark mb-4 uppercase tracking-wider">
            Property Type
          </label>
          <div className="flex flex-wrap gap-2">
            {PROPERTY_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                  filters.type === type
                    ? 'bg-mosque text-white border-mosque'
                    : 'bg-transparent text-nordic-muted border-nordic-muted/20 hover:border-mosque/30'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-bold text-nordic-dark mb-4 uppercase tracking-wider">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min Price"
              className="w-full h-11 px-4 rounded-xl border border-nordic-muted/20 focus:border-mosque outline-none text-sm transition-all"
              value={filters.minPrice}
              onChange={(e) => updateURL({ ...filters, minPrice: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="w-full h-11 px-4 rounded-xl border border-nordic-muted/20 focus:border-mosque outline-none text-sm transition-all"
              value={filters.maxPrice}
              onChange={(e) => updateURL({ ...filters, maxPrice: e.target.value })}
            />
          </div>
        </div>

        {/* Beds & Baths */}
        <div>
          <label className="block text-sm font-bold text-nordic-dark mb-4 uppercase tracking-wider">
            Beds & Baths
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-icons text-nordic-muted text-lg">bed</span>
              <input
                type="number"
                placeholder="Beds"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-nordic-muted/20 focus:border-mosque outline-none text-sm transition-all"
                value={filters.beds}
                onChange={(e) => updateURL({ ...filters, beds: e.target.value })}
              />
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-icons text-nordic-muted text-lg">bathtub</span>
              <input
                type="number"
                placeholder="Baths"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-nordic-muted/20 focus:border-mosque outline-none text-sm transition-all"
                value={filters.baths}
                onChange={(e) => updateURL({ ...filters, baths: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-bold text-nordic-dark mb-4 uppercase tracking-wider">
            Amenities
          </label>
          <div className="grid grid-cols-1 gap-3">
            {AMENITIES_LIST.map((amenity) => (
              <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-nordic-muted/20 text-mosque focus:ring-mosque"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                />
                <span className="text-sm font-semibold text-nordic-muted group-hover:text-nordic-dark transition-colors">
                  {amenity}
                </span>
              </label>
            ))}
          </div>
        </div>

        <Button className="w-full h-12 bg-mosque hover:bg-opacity-95 text-white font-bold rounded-xl mt-4">
          View Results
        </Button>
      </div>
    </div>
  )
}
