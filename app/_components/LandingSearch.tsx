'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { SearchBar } from '@/components/SearchBar'

export const LandingSearch: React.FC = () => {
  const router = useRouter()

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
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
