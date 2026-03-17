'use client'

import React from 'react'
import { SearchBar } from '@/components/SearchBar'

export const LandingSearch: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query)
    // In a real app, this would navigate to /search?q=query
  }

  return (
    <div className="relative -mt-10 z-20 flex justify-center px-4">
      <SearchBar 
        onSearch={handleSearch}
        className="shadow-2xl"
      />
    </div>
  )
}
