'use client'

import React, { useState } from 'react'
import { Button } from './Button'

interface SearchBarProps {
  onSearch: (query: string) => void
  initialQuery?: string
  className?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialQuery = '',
  className = '',
}) => {
  const [query, setQuery] = useState(initialQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 p-2 bg-white rounded-xl shadow-card border border-bg-light w-full max-w-2xl ${className}`}
    >
      <div className="flex-grow flex items-center px-4 gap-3">
        <span className="material-icons text-nordic-muted">search</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search properties..."
          className="w-full bg-transparent border-none focus:outline-none text-nordic-dark placeholder:text-nordic-muted"
        />
      </div>
      <Button 
        type="submit" 
        className="px-8 whitespace-nowrap"
      >
        Search
      </Button>
    </form>
  )
}
