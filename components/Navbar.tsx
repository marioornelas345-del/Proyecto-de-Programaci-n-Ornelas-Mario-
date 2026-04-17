'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from './Button'
import { useAuth } from '@/lib/auth'

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-bg-light">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-mosque rounded-lg flex items-center justify-center">
            <span className="material-icons text-primary text-2xl">diamond</span>
          </div>
          <span className="text-2xl font-bold text-nordic-dark tracking-tight">
            LuxeEstate
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/search?status=For Sale" className="text-nordic-dark font-medium hover:text-mosque transition-colors">Buy</Link>
          <Link href="/search?status=For Rent" className="text-nordic-dark font-medium hover:text-mosque transition-colors">Rent</Link>
          <Link href="/dashboard/properties" className="text-nordic-dark font-medium hover:text-mosque transition-colors">Sell</Link>
          <Link href="/about" className="text-nordic-dark font-medium hover:text-mosque transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-nordic-dark font-bold hover:text-mosque transition-colors flex items-center gap-2">
                <span className="material-icons">account_circle</span>
                {user.name}
              </Link>
              <button 
                onClick={signOut}
                className="text-nordic-muted hover:text-red-500 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="hidden sm:block text-nordic-dark font-bold hover:text-mosque transition-colors">Log In</Link>
              <Link href="/auth/signup">
                <Button variant="primary" className="hidden sm:flex">Sign Up</Button>
              </Link>
            </>
          )}
          <button className="md:hidden p-2 text-nordic-dark">
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
