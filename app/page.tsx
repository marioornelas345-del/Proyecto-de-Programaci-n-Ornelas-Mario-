import React from 'react'
import { Hero } from '@/components/Hero'
import { FeaturedListings } from '@/components/FeaturedListings'
import propertiesData from '@/data/properties.json'

import { LandingSearch } from './_components/LandingSearch'

export default function Home() {
  // In a real app, this would be a server action or a fetch
  const properties = propertiesData

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero 
        title="Find Your Dream Luxury Home"
        subtitle="Experience the peak of elite living with our hand-picked collection of prestigious estates."
        ctaText="View Portfolio"
      />

      {/* Search Bar - Floating over Hero slightly */}
      <LandingSearch />

      {/* Featured Listings */}
      <FeaturedListings properties={properties} />

      {/* Call to Action Section */}
      <section className="bg-bg-dark text-white py-20 px-4 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Find Your Next Investment?
          </h2>
          <p className="text-xl text-bg-light/80 mb-10">
            Our team of elite agents is ready to guide you through the process of acquiring your next luxury property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-bg-dark font-bold px-8 py-4 rounded-md hover:bg-opacity-90 transition-colors">
              Contact an Agent
            </button>
            <button className="border border-white text-white font-bold px-8 py-4 rounded-md hover:bg-white/10 transition-colors">
              List Your Property
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-dark text-bg-light py-10 px-4 border-t border-nordic-muted/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-mosque rounded flex items-center justify-center">
                <span className="material-icons text-primary text-xl">diamond</span>
              </div>
              <span className="text-xl font-bold text-white">LuxeEstate</span>
            </div>
            <p className="text-nordic-muted max-w-sm mb-6">
              The premier destination for luxury real estate, connecting high-net-worth individuals with the world&apos;s most exclusive properties.
            </p>
            <div className="flex gap-4">
              <span className="material-icons text-nordic-muted cursor-pointer hover:text-primary">facebook</span>
              <span className="material-icons text-nordic-muted cursor-pointer hover:text-primary">camera_alt</span>
              <span className="material-icons text-nordic-muted cursor-pointer hover:text-primary">alternate_email</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-nordic-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Browse Listings</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Market Reports</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Luxury Living Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Concierge Services</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-nordic-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Elite Agents</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-10 border-t border-nordic-muted/10 text-center text-sm text-nordic-muted">
          &copy; {new Date().getFullYear()} LuxeEstate. All rights reserved. 
          <span className="mx-2">|</span>
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href="#" className="hover:text-primary">Terms of Service</a>
        </div>
      </footer>
    </div>
  )
}
