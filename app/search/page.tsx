import React from 'react'
import { supabase } from '@/lib/supabase'
import { PropertyCard } from '@/components/PropertyCard'
import { LandingSearch } from '../_components/LandingSearch'

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams
  const query = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : ''
  const type = typeof resolvedSearchParams.type === 'string' ? resolvedSearchParams.type : undefined
  const status = typeof resolvedSearchParams.status === 'string' ? resolvedSearchParams.status : undefined
  const minPrice = typeof resolvedSearchParams.minPrice === 'string' ? parseInt(resolvedSearchParams.minPrice) : undefined
  const maxPrice = typeof resolvedSearchParams.maxPrice === 'string' ? parseInt(resolvedSearchParams.maxPrice) : undefined

  let queryBuilder = supabase.from('properties').select('*')

  if (query) {
    queryBuilder = queryBuilder.ilike('title', `%${query}%`)
  }

  if (type) {
    queryBuilder = queryBuilder.eq('type', type)
  }

  if (status) {
    queryBuilder = queryBuilder.eq('status', status)
  }

  if (minPrice) {
    queryBuilder = queryBuilder.gte('price', minPrice)
  }

  if (maxPrice) {
    queryBuilder = queryBuilder.lte('price', maxPrice)
  }

  const { data: properties, error } = await queryBuilder

  if (error) {
    console.error('Error fetching properties:', error)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-bg-dark pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Search Results
          </h1>
          <LandingSearch />
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-nordic-dark">
            {properties?.length || 0} Properties Found {query && `for "${query}"`}
          </h2>
        </div>

        {properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-bg-light rounded-xl border border-dashed border-nordic-muted">
            <span className="material-icons text-nordic-muted/30 text-6xl mb-4">search_off</span>
            <p className="text-nordic-muted text-lg">No properties found matching your criteria.</p>
            <p className="text-sm text-nordic-muted mt-2">Try adjusting your filters or search term.</p>
          </div>
        )}
      </main>
    </div>
  )
}
