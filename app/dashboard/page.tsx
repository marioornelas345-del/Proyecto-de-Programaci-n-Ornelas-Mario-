'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Card } from '@/components/Card'
import { PropertyCard } from '@/components/PropertyCard'
import propertiesData from '@/data/properties.json'

export default function Dashboard() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mosque"></div>
      </div>
    )
  }

  // Mock favorites
  const favorites = propertiesData.slice(0, 2)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-nordic-dark mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-nordic-muted">
            Manage your elite property portfolio and saved listings.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={logout}
            className="px-6 py-2 border border-red-200 text-red-500 rounded-md hover:bg-red-50 transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Profile Info */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <span className="material-icons text-mosque text-5xl">person</span>
            </div>
            <h2 className="text-2xl font-bold text-nordic-dark">{user.name}</h2>
            <p className="text-nordic-muted mb-6">{user.email}</p>
            <div className="w-full pt-6 border-t border-bg-light space-y-4 text-left">
              <div className="flex justify-between items-center">
                <span className="text-nordic-muted">Member Since</span>
                <span className="font-medium text-nordic-dark">March 2026</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-nordic-muted">Profile Status</span>
                <span className="bg-mosque/10 text-mosque px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                  Verified
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-nordic-dark mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 rounded-md hover:bg-bg-light text-nordic-dark transition-colors flex items-center gap-3">
                <span className="material-icons text-mosque">settings</span>
                Account Settings
              </button>
              <button className="w-full text-left px-4 py-2 rounded-md hover:bg-bg-light text-nordic-dark transition-colors flex items-center gap-3">
                <span className="material-icons text-mosque">notifications</span>
                Notifications
              </button>
              <button className="w-full text-left px-4 py-2 rounded-md hover:bg-bg-light text-nordic-dark transition-colors flex items-center gap-3">
                <span className="material-icons text-mosque">security</span>
                Privacy & Security
              </button>
            </div>
          </Card>
        </div>

        {/* Right: Favorites */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-nordic-dark">Your Saved Listings</h2>
            <span className="text-nordic-muted">{favorites.length} Properties</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {favorites.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <button className="w-full py-4 border-2 border-dashed border-nordic-muted/20 rounded-xl text-nordic-muted hover:border-primary/40 hover:text-mosque transition-all flex items-center justify-center gap-2">
            <span className="material-icons">add</span>
            Browse More Properties
          </button>
        </div>
      </div>
    </div>
  )
}
