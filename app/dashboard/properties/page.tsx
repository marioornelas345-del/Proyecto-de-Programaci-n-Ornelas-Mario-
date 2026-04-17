'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'
import { Card } from '@/components/Card'
import { PropertyCard } from '@/components/PropertyCard'
import { Button } from '@/components/Button'
import { supabase } from '@/lib/supabase'

export default function UserPropertiesPage() {
  const { user, isLoading: isAuthLoading } = useAuth()
  const [properties, setProperties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, isAuthLoading, router])

  useEffect(() => {
    const fetchUserProperties = async () => {
      if (!user) return
      
      try {
        // Since we might not have a 'user_id' column in properties yet in some schemas
        // we'll try to fetch, but handle the case where it might be empty
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          // .eq('user_id', user.id) // Enable this when user_id is in schema
          .limit(10) // Just showing some for the "alive" feeling
        
        if (error) {
          console.error('Error fetching properties:', error)
        } else {
          setProperties(data || [])
        }
      } catch (e) {
        console.error('Exception fetching properties:', e)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchUserProperties()
    }
  }, [user])

  if (isAuthLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mosque"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-32">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-nordic-dark mb-2">
            My Properties
          </h1>
          <p className="text-nordic-muted">
            Manage and track the performance of your exclusive listings.
          </p>
        </div>
        <Link href="/dashboard/properties/new">
          <Button size="lg" className="flex items-center gap-2">
            <span className="material-icons">add_circle</span>
            List New Property
          </Button>
        </Link>
      </div>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="relative group">
              <PropertyCard property={property} />
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/dashboard/properties/${property.id}`}>
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-soft hover:text-mosque transition-colors">
                    <span className="material-icons">edit</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 text-center bg-bg-light rounded-2xl border-2 border-dashed border-nordic-muted/20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-soft mb-6">
            <span className="material-icons text-nordic-muted/30 text-4xl">home_work</span>
          </div>
          <h3 className="text-2xl font-bold text-nordic-dark mb-2">No Properties Listed</h3>
          <p className="text-nordic-muted max-w-sm mx-auto mb-8">
            You haven&apos;t listed any properties for sale or rent yet. Start reaching elite buyers today.
          </p>
          <Link href="/dashboard/properties/new">
            <Button variant="primary">Create Your First Listing</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
