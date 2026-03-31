import React from 'react'
import { PropertyForm } from '@/components/PropertyForm'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

interface EditPropertyPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params

  // Fetch initial data
  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !property) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-bg-light p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-nordic-dark mb-2">Edit Listing</h1>
          <p className="text-nordic-muted">Modify the details of {property.title}.</p>
        </header>
        
        <PropertyForm mode="edit" initialData={property} />
      </div>
    </div>
  )
}
