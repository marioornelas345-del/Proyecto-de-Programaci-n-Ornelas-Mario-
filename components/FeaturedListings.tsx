import React from 'react'
import { Property, PropertyCard } from './PropertyCard'

interface FeaturedListingsProps {
  properties: Property[]
}

export const FeaturedListings: React.FC<FeaturedListingsProps> = ({ properties }) => {
  const featured = properties.filter(p => p.isFeatured)

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-nordic-dark mb-2">
            Featured Listings
          </h2>
          <p className="text-nordic-muted max-w-lg">
            A hand-picked collection of the most prestigious properties in our portfolio.
          </p>
        </div>
        <button className="text-mosque font-bold flex items-center gap-1 hover:underline">
          View All Listings
          <span className="material-icons">arrow_forward</span>
        </button>
      </div>

      {featured.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-bg-light rounded-xl border border-dashed border-nordic-muted">
          <p className="text-nordic-muted">No featured properties available.</p>
        </div>
      )}
    </section>
  )
}
