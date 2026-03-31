import React from 'react'
import { PropertyForm } from '@/components/PropertyForm'

export default function NewPropertyPage() {
  return (
    <div className="min-h-screen bg-bg-light p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-nordic-dark mb-2">List New Property</h1>
          <p className="text-nordic-muted">Add a prestigious addition to the LuxeEstate portfolio.</p>
        </header>
        
        <PropertyForm mode="create" />
      </div>
    </div>
  )
}
