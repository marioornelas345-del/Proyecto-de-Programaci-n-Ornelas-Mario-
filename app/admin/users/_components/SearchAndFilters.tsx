'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface SearchAndFiltersProps {
  currentRole: string
  currentQuery: string
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({ currentRole, currentQuery }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(currentQuery)

  const roles = ['All', 'Admin', 'Agent', 'Broker', 'Buyer', 'Seller']

  const updateFilters = (newRole?: string, newQuery?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newRole) {
      if (newRole === 'All') params.delete('role')
      else params.set('role', newRole)
    }
    if (newQuery !== undefined) {
      if (!newQuery) params.delete('q')
      else params.set('q', newQuery)
    }
    router.push(`/admin/users?${params.toString()}`)
  }

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-4 rounded-3xl shadow-soft border border-nordic-muted/10">
      <div className="flex flex-wrap gap-2">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => updateFilters(role)}
            className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
              currentRole === role
                ? 'bg-nordic-dark text-white shadow-lg'
                : 'text-nordic-muted hover:bg-bg-light hover:text-nordic-dark'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      <div className="relative flex-grow lg:max-w-md">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-icons text-nordic-muted">search</span>
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full h-12 pl-12 pr-4 rounded-2xl border border-nordic-muted/20 focus:border-mosque outline-none text-sm transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && updateFilters(undefined, query)}
        />
      </div>
    </div>
  )
}
