import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from './Card'

export interface Property {
  id: string
  title: string
  price: number
  address: string
  beds: number
  baths: number
  sqft: number
  images: string[]
  isFeatured?: boolean
}

interface PropertyCardProps {
  property: Property
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link href={`/property/${property.id}`} className="block group">
      <Card noPadding className="h-full flex flex-col group-hover:shadow-lg transition-shadow">
        <div className="relative h-64 w-full">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {property.isFeatured && (
            <div className="absolute top-4 left-4 bg-primary text-bg-dark px-3 py-1 text-sm font-bold rounded-md z-10">
              FEATURED
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-bg-dark/80 text-white px-3 py-1 text-lg font-bold rounded-md z-10 backdrop-blur-sm">
            ${property.price.toLocaleString()}
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-nordic-dark mb-2 line-clamp-1">
            {property.title}
          </h3>
          <p className="text-sm text-nordic-muted mb-4 line-clamp-1 flex items-center gap-1">
            <span className="material-icons text-sm">place</span>
            {property.address}
          </p>
          
          <div className="mt-auto pt-4 border-t border-bg-light grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center">
              <span className="material-icons text-mosque text-xl">bed</span>
              <span className="text-xs font-medium text-nordic-dark">{property.beds} Beds</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-icons text-mosque text-xl">bathtub</span>
              <span className="text-xs font-medium text-nordic-dark">{property.baths} Baths</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-icons text-mosque text-xl">square_foot</span>
              <span className="text-xs font-medium text-nordic-dark">{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
