import React, { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { PropertyCard } from '@/components/PropertyCard'
import { LandingSearch } from '../_components/LandingSearch'
import { Skeleton } from '@/components/ui/skeleton'
import { SearchFiltersSidebar } from '@/components/SearchFiltersSidebar'

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function SearchSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[250px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}

async function SearchResults({ params }: { params: { [key: string]: string | string[] | undefined } }) {
  const query = typeof params.q === 'string' ? params.q : ''
  const location = typeof params.location === 'string' ? params.location : ''
  const type = typeof params.type === 'string' ? params.type : undefined
  const status = typeof params.status === 'string' ? params.status : undefined
  const minPrice = typeof params.minPrice === 'string' ? parseInt(params.minPrice) : undefined
  const maxPrice = typeof params.maxPrice === 'string' ? parseInt(params.maxPrice) : undefined
  const minBeds = typeof params.beds === 'string' ? parseInt(params.beds) : undefined
  const minBaths = typeof params.baths === 'string' ? parseInt(params.baths) : undefined
  
  let amenities: string[] = []
  if (typeof params.amenities === 'string') {
    amenities = [params.amenities]
  } else if (Array.isArray(params.amenities)) {
    amenities = params.amenities as string[]
  }

  let queryBuilder = supabase.from('properties').select('*')

  if (query || location) {
    const searchTerm = query || location
    queryBuilder = queryBuilder.or(`title.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`)
  }

  if (type && type !== 'All') {
    queryBuilder = queryBuilder.eq('type', type)
  }

  if (status && status !== 'All') {
    queryBuilder = queryBuilder.eq('status', status)
  }

  if (minPrice) queryBuilder = queryBuilder.gte('price', minPrice)
  if (maxPrice) queryBuilder = queryBuilder.lte('price', maxPrice)
  if (minBeds) queryBuilder = queryBuilder.gte('beds', minBeds)
  if (minBaths) queryBuilder = queryBuilder.gte('baths', minBaths)

  if (amenities.length > 0) {
    queryBuilder = queryBuilder.contains('amenities', amenities)
  }

  const { data: properties, error } = await queryBuilder

  if (error) {
    console.error('Error fetching properties:', error)
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-xl font-bold text-nordic-dark">
          {properties?.length || 0} Exclusive Properties Found
        </h2>
      </div>

      {properties && properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-bg-light rounded-2xl border border-dashed border-nordic-muted/30">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-soft mb-6">
            <span className="material-symbols-outlined text-nordic-muted text-4xl">search_off</span>
          </div>
          <h3 className="text-2xl font-bold text-nordic-dark mb-2">No Properties Found</h3>
          <p className="text-nordic-muted max-w-sm mx-auto mb-8">
            We couldn&apos;t find any properties matching your specific criteria. Try adjusting your filters or contact an agent for private listings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-mosque text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all">
              Clear All Filters
            </button>
            <button className="border border-mosque text-mosque px-8 py-3 rounded-xl font-bold hover:bg-mosque/5 transition-all">
              Contact an Agent
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      {/* Header Section */}
      <div className="bg-bg-dark pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Our Portfolio
            </h1>
            <p className="text-bg-light/60 text-lg max-w-2xl mx-auto">
              Refine your search for the world&apos;s most prestigious real estate estates.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <LandingSearch />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-80">
            <Suspense fallback={<div className="w-full h-[600px] bg-white rounded-2xl animate-pulse" />}>
              <SearchFiltersSidebar />
            </Suspense>
          </div>

          {/* Results Grid */}
          <div className="flex-grow">
            <Suspense key={JSON.stringify(resolvedSearchParams)} fallback={<SearchSkeleton />}>
              <SearchResults params={resolvedSearchParams} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
