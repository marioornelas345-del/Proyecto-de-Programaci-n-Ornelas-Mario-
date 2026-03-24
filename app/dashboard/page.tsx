'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Card } from '@/components/Card'
import { PropertyCard } from '@/components/PropertyCard'
import { supabase } from '@/lib/supabase'

interface Profile {
  id: string
  name: string
  avatar_url: string | null
}

export default function Dashboard() {
  const { user, isLoading: isAuthLoading, logout } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isProfileLoading, setIsProfileLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, isAuthLoading, router])

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        if (error) {
          console.error('Error fetching profile:', error)
        } else {
          setProfile(data)
        }
      } catch (e) {
        console.error('Exception fetching profile:', e)
      } finally {
        setIsProfileLoading(false)
      }
    }

    if (user) {
      fetchProfile()
    }
  }, [user])

  if (isAuthLoading || (user && isProfileLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mosque"></div>
      </div>
    )
  }

  if (!user) return null

  const displayName = profile?.name || user.user_metadata?.full_name || user.email?.split('@')[0]

  // Mock favorites for now (will be implemented in Phase 4)
  const favorites: any[] = []

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-nordic-dark mb-2">
            Welcome back, {displayName}
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
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4 overflow-hidden border-2 border-mosque/20">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span className="material-icons text-mosque text-5xl">person</span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-nordic-dark">{displayName}</h2>
            <p className="text-nordic-muted mb-6">{user.email}</p>
            <div className="w-full pt-6 border-t border-bg-light space-y-4 text-left">
              <div className="flex justify-between items-center">
                <span className="text-nordic-muted">Member Since</span>
                <span className="font-medium text-nordic-dark">
                  {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
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

          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {favorites.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-nordic-muted/20 rounded-xl">
               <span className="material-icons text-nordic-muted/30 text-6xl mb-4">favorite_border</span>
               <p className="text-nordic-muted">You haven't saved any properties yet.</p>
            </div>
          )}

          <button 
            onClick={() => router.push('/')}
            className="w-full py-4 bg-white border border-nordic-muted/20 rounded-xl text-nordic-muted hover:border-primary/40 hover:text-mosque transition-all flex items-center justify-center gap-2"
          >
            <span className="material-icons">search</span>
            Browse Properties
          </button>
        </div>
      </div>
    </div>
  )
}
