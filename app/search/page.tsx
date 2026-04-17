import React, { Suspense } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { PropertyCard } from '@/components/PropertyCard'
import { LandingSearch } from '../_components/LandingSearch'
import { Skeleton } from '@/components/ui/skeleton'
import { SearchFiltersSidebar } from '@/components/SearchFiltersSidebar'
import { Button } from '@/components/Button'

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
  
  const type = typeof params.type === 'string' && params.type !== 'All' ? params.type : undefined
  const status = typeof params.status === 'string' && params.status !== 'All' ? params.status : undefined
  
  let minPrice: number | undefined = undefined
  if (typeof params.minPrice === 'string') {
    const parsedPrice = parseInt(params.minPrice)
    if (!isNaN(parsedPrice)) {
      minPrice = parsedPrice
    }
  }
  
  let maxPrice: number | undefined = undefined
  if (typeof params.maxPrice === 'string') {
    const parsedPrice = parseInt(params.maxPrice)
    if (!isNaN(parsedPrice)) {
      maxPrice = parsedPrice
    }
  }

  let minBeds: number | undefined = undefined
  if (typeof params.beds === 'string') {
    const parsedBeds = parseInt(params.beds)
    if (!isNaN(parsedBeds)) {
      minBeds = parsedBeds
    }
  }

  let minBaths: number | undefined = undefined
  if (typeof params.baths === 'string') {
    const parsedBaths = parseInt(params.baths)
    if (!isNaN(parsedBaths)) {
      minBaths = parsedBaths
    }
  }
  
  let amenities: string[] = []
  if (typeof params.amenities === 'string') {
    amenities = [params.amenities]
  } else if (Array.isArray(params.amenities)) {
    amenities = params.amenities.filter(item => typeof item === 'string') as string[]
  }

  let queryBuilder = supabase.from('properties').select('*')

  if (query || location) {
    const searchTerm = query || location
    queryBuilder = queryBuilder.or(`title.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`)
  }

  if (type) { // Already filtered out 'All'
    queryBuilder = queryBuilder.eq('type', type)
  }

  if (status) { // Already filtered out 'All'
    queryBuilder = queryBuilder.eq('status', status)
  }

  if (minPrice !== undefined) queryBuilder = queryBuilder.gte('price', minPrice)
  if (maxPrice !== undefined) queryBuilder = queryBuilder.lte('price', maxPrice)
  if (minBeds !== undefined) queryBuilder = queryBuilder.gte('beds', minBeds)
  if (minBaths !== undefined) queryBuilder = queryBuilder.gte('baths', minBaths)

  if (amenities.length > 0) {
    queryBuilder = queryBuilder.contains('amenities', amenities)
  }

  const { data: properties, error } = await queryBuilder

  if (error) {
    console.error('Error fetching properties:', error)
    // In a production app, you'd want to return an error UI here
    return <div className="text-red-500">Error loading properties. Please try again later.</div>
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
            <Link href="/search">
              <Button variant="primary" className="px-8">
                Clear All Filters
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="px-8 border-mosque text-mosque hover:bg-mosque/5">
                Contact an Agent
              </Button>
            </Link>
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
