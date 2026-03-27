import React from 'react'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
// Assuming these components exist and are compatible
import { ImageGallery } from '@/components/ImageGallery'
import { ContactForm } from '@/components/ContactForm'

interface PropertyPageProps {
  params: Promise<{ slug: string }>
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params
  
  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !property) {
    console.error('Error fetching property:', error)
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Images and Details */}
        <div className="lg:col-span-2 space-y-8">
          <ImageGallery images={property.images} />
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-nordic-dark mb-2">{property.title}</h1>
              <p className="text-lg text-nordic-muted flex items-center gap-1">
                <span className="material-icons text-mosque">place</span>
                {property.address}
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-3xl font-bold text-mosque">${property.price.toLocaleString()}</p>
              <div className="flex gap-2 mt-1">
                {property.type && (
                  <span className="bg-bg-light px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-nordic-muted">
                    {property.type}
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  property.status === 'For Rent' ? 'bg-mosque/10 text-mosque' : 'bg-primary/20 text-nordic-dark'
                }`}>
                  {property.status || 'For Sale'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 py-8 border-y border-bg-light">
            <div className="flex flex-col items-center justify-center p-4 bg-bg-light rounded-lg">
              <span className="material-icons text-mosque text-3xl mb-2">bed</span>
              <span className="text-lg font-bold text-nordic-dark">{property.beds} <span className="text-sm font-normal text-nordic-muted">Beds</span></span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-bg-light rounded-lg">
              <span className="material-icons text-mosque text-3xl mb-2">bathtub</span>
              <span className="text-lg font-bold text-nordic-dark">{property.baths} <span className="text-sm font-normal text-nordic-muted">Baths</span></span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-bg-light rounded-lg">
              <span className="material-icons text-mosque text-3xl mb-2">square_foot</span>
              <span className="text-lg font-bold text-nordic-dark">{property.sqft.toLocaleString()} <span className="text-sm font-normal text-nordic-muted">sqft</span></span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-nordic-dark mb-4">About this home</h2>
              <p className="text-nordic-muted leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-nordic-dark mb-4">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                  {property.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 text-nordic-muted">
                      <span className="material-icons text-mosque/60 text-sm">check_circle</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {property.geolocation && (
              <div>
                <h2 className="text-2xl font-bold text-nordic-dark mb-4">Location</h2>
                <div className="w-full aspect-video bg-bg-light rounded-xl overflow-hidden relative flex items-center justify-center border border-nordic-muted/10">
                   {/* Placeholder for Map - In a real app, use Google Maps or Mapbox here */}
                   <div className="text-center p-6">
                     <span className="material-icons text-4xl text-nordic-muted/30 mb-2">map</span>
                     <p className="text-nordic-muted">Map view would be integrated here</p>
                     <p className="text-xs text-nordic-muted/50 mt-1">
                       Lat: {(property.geolocation as any).lat}, Lng: {(property.geolocation as any).lng}
                     </p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-card border border-bg-light">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-bg-light">
                <div className="w-14 h-14 rounded-full bg-bg-light overflow-hidden border-2 border-white shadow-sm relative">
                  <Image 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" 
                    alt="Agent" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-nordic-dark">Alexander Wright</h3>
                  <div className="flex items-center gap-1 text-xs text-mosque font-medium">
                    <span className="material-icons text-[14px]">star</span>
                    <span>Top Rated Agent</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-nordic-dark mb-4">Schedule a Visit</h3>
              <ContactForm />
            </div>
            
            <div className="bg-mosque/5 p-6 rounded-xl border border-mosque/10 flex flex-col items-center text-center gap-3">
              <span className="material-icons text-mosque text-2xl">calculate</span>
              <div>
                <h3 className="font-semibold text-nordic-dark">Mortgage Calculator</h3>
                <p className="text-sm text-nordic-muted">Estimate your monthly payments</p>
              </div>
              <button className="mt-2 w-full py-2 bg-white border border-nordic-muted/20 rounded-lg text-sm font-semibold hover:border-mosque transition-colors text-nordic-dark">
                Calculate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
