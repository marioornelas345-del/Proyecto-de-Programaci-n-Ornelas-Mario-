import React from 'react'
import { notFound } from 'next/navigation'
import propertiesData from '@/data/properties.json'
import Image from 'next/image'
import { ImageGallery } from '@/components/ImageGallery'
import { ContactForm } from '@/components/ContactForm'

interface PropertyPageProps {
  params: Promise<{ id: string }>
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params
  const property = propertiesData.find((p) => p.id === id)

  if (!property) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Images and Details */}
        <div className="lg:col-span-2 space-y-8">
          <ImageGallery images={property.images} />
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-nordic-dark mb-2">{property.title}</h1>
              <p className="text-lg text-nordic-muted flex items-center gap-1">
                <span className="material-icons text-mosque">place</span>
                {property.address}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-mosque">${property.price.toLocaleString()}</p>
              <p className="text-nordic-muted">{property.type}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 py-6 border-y border-bg-light">
            <div className="flex flex-col items-center gap-1">
              <span className="material-icons text-mosque text-3xl">bed</span>
              <span className="text-lg font-bold">{property.beds} Beds</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="material-icons text-mosque text-3xl">bathtub</span>
              <span className="text-lg font-bold">{property.baths} Baths</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="material-icons text-mosque text-3xl">square_foot</span>
              <span className="text-lg font-bold">{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-nordic-dark mb-4">Description</h2>
            <p className="text-nordic-muted leading-relaxed text-lg">
              {property.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-nordic-dark mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 text-nordic-dark">
                  <span className="material-icons text-primary">check_circle</span>
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-white p-8 rounded-2xl shadow-card border border-bg-light">
            <h3 className="text-2xl font-bold text-nordic-dark mb-6">Inquire About This Property</h3>
            <ContactForm />
            
            <div className="mt-8 pt-8 border-t border-bg-light">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-bg-light overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" 
                    alt="Agent" 
                    width={64} 
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-nordic-dark">Alexander Wright</p>
                  <p className="text-sm text-nordic-muted">Senior Luxury Advisor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
