import React from 'react'
import { Button } from '@/components/Button'

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Space for Fixed Navbar */}
      <div className="h-20 bg-bg-dark"></div>

      {/* Hero Section */}
      <section className="bg-bg-dark text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Contact Our Elite Team</h1>
          <p className="text-xl text-bg-light/60 max-w-2xl mx-auto">
            Experience personalized service tailored to your luxury real estate needs. Our agents are ready to assist you.
          </p>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 rounded-2xl border border-bg-light shadow-card">
              <h2 className="text-3xl font-bold text-nordic-dark mb-8">Inquiry Form</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-bg-light focus:ring-2 focus:ring-mosque/20 focus:border-mosque outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-bg-light focus:ring-2 focus:ring-mosque/20 focus:border-mosque outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider">Subject</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-bg-light focus:ring-2 focus:ring-mosque/20 focus:border-mosque outline-none transition-all appearance-none bg-white">
                    <option>Buying Inquiry</option>
                    <option>Selling Inquiry</option>
                    <option>Property Management</option>
                    <option>General Question</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-lg border border-bg-light focus:ring-2 focus:ring-mosque/20 focus:border-mosque outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <Button size="lg" className="w-full">Send Message</Button>
              </form>
            </div>

            {/* Contact Info & Map Placeholder */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-nordic-dark mb-8">Our Global Headquarters</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-mosque/10 rounded-xl flex items-center justify-center shrink-0">
                      <span className="material-icons text-mosque">location_on</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-nordic-dark text-lg">Address</h4>
                      <p className="text-nordic-muted">789 Elite Avenue, Beverly Hills<br />California, 90210</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-mosque/10 rounded-xl flex items-center justify-center shrink-0">
                      <span className="material-icons text-mosque">phone</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-nordic-dark text-lg">Phone</h4>
                      <p className="text-nordic-muted">+1 (555) LUXE-001</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-mosque/10 rounded-xl flex items-center justify-center shrink-0">
                      <span className="material-icons text-mosque">email</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-nordic-dark text-lg">Email</h4>
                      <p className="text-nordic-muted">concierge@luxeestate.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-64 bg-bg-light rounded-2xl overflow-hidden border border-bg-light group">
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="text-center">
                     <span className="material-icons text-nordic-muted/40 text-5xl mb-2">map</span>
                     <p className="text-nordic-muted font-medium">Interactive Map View</p>
                   </div>
                </div>
                <div className="absolute inset-0 bg-mosque/5 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
