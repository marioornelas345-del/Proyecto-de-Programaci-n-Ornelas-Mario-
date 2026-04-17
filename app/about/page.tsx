import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/Button'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf115d?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-bg-dark/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Redefining Luxury Living
          </h1>
          <p className="text-xl text-bg-light/80 max-w-2xl mx-auto">
            LuxeEstate is more than a brokerage. We are a lifestyle curator for the world&apos;s most discerning individuals.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 bg-bg-light">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
              alt="Real Estate Professional"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mosque/10 text-mosque rounded-full text-sm font-bold uppercase tracking-wider">
              <span className="material-icons text-sm">history</span>
              Our Story
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-nordic-dark leading-tight">
              A Legacy of Excellence Since 2010
            </h2>
            <p className="text-lg text-nordic-muted leading-relaxed">
              Founded on the principles of integrity, discretion, and unparalleled service, LuxeEstate has grown into the premier destination for high-end real estate worldwide.
            </p>
            <p className="text-lg text-nordic-muted leading-relaxed">
              We specialize in properties that are architectural masterpieces, historical landmarks, and modern marvels. Our portfolio represents the pinnacle of luxury, offering our clients exclusive access to the world&apos;s most prestigious addresses.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <div className="text-4xl font-bold text-mosque mb-2">15+</div>
                <div className="text-sm font-medium text-nordic-muted uppercase tracking-wider">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-mosque mb-2">$4B+</div>
                <div className="text-sm font-medium text-nordic-muted uppercase tracking-wider">Property Sales</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-nordic-dark mb-6">Our Core Values</h2>
          <p className="text-xl text-nordic-muted max-w-2xl mx-auto">
            The pillars that support our commitment to excellence and our clients&apos; success.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: 'Exclusivity',
              icon: 'diamond',
              desc: 'We provide access to off-market listings and private estates that aren&apos;t available to the general public.'
            },
            {
              title: 'Integrity',
              icon: 'verified_user',
              desc: 'Unwavering ethics and complete transparency are at the heart of every transaction we facilitate.'
            },
            {
              title: 'Innovation',
              icon: 'auto_awesome',
              desc: 'Leveraging cutting-edge technology and AI to provide superior market insights and property matching.'
            }
          ].map((value, i) => (
            <div key={i} className="bg-white p-10 rounded-2xl border border-bg-light shadow-soft hover:shadow-card transition-all group">
              <div className="w-16 h-16 bg-mosque/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-mosque transition-colors">
                <span className="material-icons text-mosque text-3xl group-hover:text-white transition-colors">{value.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-nordic-dark mb-4">{value.title}</h3>
              <p className="text-nordic-muted leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-bg-dark text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Start Your Journey?</h2>
          <p className="text-xl text-bg-light/70 mb-12">
            Whether you are looking to acquire a new estate or sell a prized property, our team is here to provide expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/search">
              <Button size="lg" className="w-full sm:w-auto">Browse Collection</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                Join LuxeEstate
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
