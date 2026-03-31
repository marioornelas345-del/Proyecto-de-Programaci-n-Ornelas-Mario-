import React, { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { ContactForm } from '@/components/ContactForm'
import { Skeleton } from '@/components/ui/skeleton'
import { ModernCarousel } from '@/components/ModernCarousel'

interface PropertyPageProps {
  params: Promise<{ slug: string }>
}

async function PropertyDetails({ slug }: { slug: string }) {
  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !property) {
    notFound()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
      {/* Left Column: Gallery and Detailed Info */}
      <div className="lg:col-span-8 space-y-8">
        <ModernCarousel 
          images={property.images || []} 
          title={property.title} 
          isExclusive={property.is_exclusive}
          isNewArrival={property.is_new_arrival}
        />
          images={property.images || []} 
          title={property.title} 
          isExclusive={property.is_exclusive}
          isNewArrival={property.is_new_arrival}
        />

        {/* Property Features - Mobile Optimized Header */}
        <div className="lg:hidden space-y-4">
           <h1 className="text-3xl font-bold text-nordic-dark">${property.price.toLocaleString()}</h1>
           <p className="text-nordic-muted font-medium flex items-center gap-1">
             <span className="material-icons text-mosque text-sm">location_on</span>
             {property.address}
           </p>
        </div>

        {/* Property Attributes Grid */}
        <div className="bg-white p-8 rounded-2xl shadow-soft border border-nordic-muted/5">
          <h2 className="text-sm font-bold text-nordic-muted uppercase tracking-widest mb-6">Property Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-2xl border border-mosque/10">
              <span className="material-icons text-mosque text-2xl mb-2">square_foot</span>
              <span className="text-xl font-bold text-nordic-dark">{property.sqft?.toLocaleString() || '--'}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-nordic-muted/60 mt-1">Sq Ft</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-2xl border border-mosque/10">
              <span className="material-icons text-mosque text-2xl mb-2">bed</span>
              <span className="text-xl font-bold text-nordic-dark">{property.beds || '--'}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-nordic-muted/60 mt-1">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-2xl border border-mosque/10">
              <span className="material-icons text-mosque text-2xl mb-2">shower</span>
              <span className="text-xl font-bold text-nordic-dark">{property.baths || '--'}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-nordic-muted/60 mt-1">Bathrooms</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-2xl border border-mosque/10">
              <span className="material-icons text-mosque text-2xl mb-2">home</span>
              <span className="text-xl font-bold text-nordic-dark truncate w-full text-center px-1">{property.type || '--'}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-nordic-muted/60 mt-1">Type</span>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white p-8 rounded-2xl shadow-soft border border-nordic-muted/5">
          <h2 className="text-xl font-bold text-nordic-dark mb-6">About this home</h2>
          <div className="prose prose-slate max-w-none text-nordic-muted leading-relaxed text-lg">
            <p>{property.description}</p>
          </div>
        </div>

        {/* Amenities Section */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="bg-white p-8 rounded-2xl shadow-soft border border-nordic-muted/5">
            <h2 className="text-xl font-bold text-nordic-dark mb-6">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {property.amenities.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center gap-3 text-nordic-muted font-medium">
                  <span className="material-icons text-mosque/60 text-sm">check_circle</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mortgage Calculator Mini-CTA */}
        <div className="bg-mosque/5 p-8 rounded-2xl border border-mosque/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4 text-center sm:text-left">
            <div className="p-4 bg-white rounded-2xl text-mosque shadow-card hidden sm:block">
              <span className="material-icons text-2xl">calculate</span>
            </div>
            <div>
              <h3 className="font-bold text-nordic-dark text-lg">Estimated Payment</h3>
              <p className="text-nordic-muted">Starting from <strong className="text-mosque">${(property.price / 240).toLocaleString(undefined, {maximumFractionDigits: 0})}/mo</strong> with 20% down</p>
            </div>
          </div>
          <button className="whitespace-nowrap px-8 py-4 bg-white border border-nordic-muted/20 rounded-xl font-bold hover:border-mosque transition-all text-nordic-dark shadow-sm hover:shadow-md">
            Calculate Mortgage
          </button>
        </div>
      </div>

      {/* Right Column: Sticky Sidebar */}
      <div className="lg:col-span-4 relative">
        <div className="sticky top-28 space-y-6">
          {/* Main Info Card */}
          <div className="bg-white p-8 rounded-2xl shadow-soft border border-nordic-muted/5">
            <div className="mb-8 hidden lg:block">
              <h1 className="text-4xl font-bold text-nordic-dark mb-3">${property.price.toLocaleString()}</h1>
              <p className="text-nordic-muted font-medium flex items-center gap-1">
                <span className="material-icons text-mosque text-sm">location_on</span>
                {property.address}
              </p>
            </div>
            
            <div className="h-px bg-bg-light mb-8 hidden lg:block"></div>
            
            {/* Agent Section */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-bg-light shadow-sm">
                <Image 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200" 
                  alt="Agent" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-nordic-dark">Alexander Wright</h3>
                <div className="flex items-center gap-1 text-xs text-mosque font-bold uppercase tracking-wider">
                  <span className="material-icons text-[14px]">verified</span>
                  <span>Elite Agent</span>
                </div>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="p-3 rounded-xl bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-all shadow-sm">
                  <span className="material-icons text-sm">chat</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button className="w-full bg-mosque hover:bg-opacity-95 text-white py-5 px-6 rounded-2xl font-bold transition-all shadow-xl shadow-mosque/20 flex items-center justify-center gap-3 group">
                <span className="material-icons text-xl group-hover:scale-110 transition-transform">calendar_today</span>
                Schedule Visit
              </button>
              <div className="p-6 bg-bg-light/50 rounded-2xl border border-nordic-muted/5">
                <h4 className="font-bold text-nordic-dark mb-4">Express Interest</h4>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Map Preview Card */}
          <div className="bg-white p-3 rounded-2xl shadow-soft border border-nordic-muted/5">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-bg-light">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-10 h-10 bg-mosque rounded-full border-4 border-white shadow-xl animate-bounce flex items-center justify-center">
                  <span className="material-icons text-white text-sm">home</span>
                </div>
              </div>
              <div className="w-full h-full bg-slate-200 flex items-center justify-center text-nordic-muted/30">
                <span className="material-icons text-4xl">map</span>
              </div>
              <a className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-2 rounded-lg shadow-lg text-nordic-dark hover:text-mosque transition-colors z-20 border border-nordic-muted/10" href="#">
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
      <div className="lg:col-span-8 space-y-8">
        <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
      <div className="lg:col-span-4">
        <Skeleton className="h-[600px] w-full rounded-2xl sticky top-28" />
      </div>
    </div>
  )
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params

  return (
    <div className="min-h-screen bg-bg-light selection:bg-mosque/20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<DetailsSkeleton />}>
          <PropertyDetails slug={slug} />
        </Suspense>
      </main>
    </div>
  )
}
