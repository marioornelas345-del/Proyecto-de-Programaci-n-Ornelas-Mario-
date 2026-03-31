'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function ProfileSetupPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    role: 'Buyer',
    phone: '',
    preferences: {
      location: '',
      budget: '',
      propertyType: ''
    }
  })
  const router = useRouter()

  const handleUpdateProfile = async () => {
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      const { error } = await supabase
        .from('profiles')
        .update({
          role: formData.role,
          phone: formData.phone,
          preferences: formData.preferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error

      router.push('/dashboard')
    } catch (err) {
      console.error('Error updating profile:', err)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-soft border border-nordic-muted/10 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-bg-light flex">
          <div 
            className="h-full bg-mosque transition-all duration-500" 
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        <div className="p-8 md:p-12">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center">
                <span className="text-mosque font-bold text-sm uppercase tracking-widest">Step 1 of 3</span>
                <h2 className="text-3xl font-bold text-nordic-dark mt-2">What is your role?</h2>
                <p className="text-nordic-muted mt-2">Tailor your experience to your needs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Buyer', 'Seller', 'Agent'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setFormData({ ...formData, role })}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                      formData.role === role 
                        ? 'border-mosque bg-mosque/5 text-mosque' 
                        : 'border-nordic-muted/10 hover:border-mosque/30 text-nordic-muted'
                    }`}
                  >
                    <span className="material-icons text-3xl">
                      {role === 'Buyer' ? 'shopping_bag' : role === 'Seller' ? 'sell' : 'business_center'}
                    </span>
                    <span className="font-bold">{role}</span>
                  </button>
                ))}
              </div>

              <Button 
                onClick={() => setStep(2)} 
                className="w-full h-14 bg-mosque text-white font-bold rounded-xl shadow-lg shadow-mosque/20"
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center">
                <span className="text-mosque font-bold text-sm uppercase tracking-widest">Step 2 of 3</span>
                <h2 className="text-3xl font-bold text-nordic-dark mt-2">Contact Details</h2>
                <p className="text-nordic-muted mt-2">So our agents can reach you for exclusive offers</p>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-nordic-dark ml-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-14 px-5 rounded-2xl border border-nordic-muted/20 focus:border-mosque outline-none transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-14 rounded-xl">Back</Button>
                <Button onClick={() => setStep(3)} className="flex-[2] h-14 bg-mosque text-white font-bold rounded-xl shadow-lg shadow-mosque/20">Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center">
                <span className="text-mosque font-bold text-sm uppercase tracking-widest">Step 3 of 3</span>
                <h2 className="text-3xl font-bold text-nordic-dark mt-2">Your Preferences</h2>
                <p className="text-nordic-muted mt-2">Help us find your perfect match</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-nordic-dark mb-2 ml-1">Preferred Location</label>
                  <select 
                    className="w-full h-14 px-5 rounded-2xl border border-nordic-muted/20 focus:border-mosque outline-none transition-all appearance-none bg-white"
                    value={formData.preferences.location}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      preferences: { ...formData.preferences, location: e.target.value } 
                    })}
                  >
                    <option value="">Select a region</option>
                    <option value="Beverly Hills">Beverly Hills</option>
                    <option value="Malibu">Malibu</option>
                    <option value="Hamptons">The Hamptons</option>
                    <option value="Miami">Miami Beach</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-nordic-dark mb-2 ml-1">Property Type</label>
                  <div className="flex flex-wrap gap-2">
                    {['Villa', 'Penthouse', 'Mansion', 'Estate'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFormData({ 
                          ...formData, 
                          preferences: { ...formData.preferences, propertyType: type } 
                        })}
                        className={`px-6 py-2 rounded-full border transition-all text-sm font-semibold ${
                          formData.preferences.propertyType === type
                            ? 'bg-mosque text-white border-mosque'
                            : 'bg-transparent text-nordic-muted border-nordic-muted/20 hover:border-mosque/30'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-14 rounded-xl">Back</Button>
                <Button 
                  onClick={handleUpdateProfile} 
                  disabled={isLoading}
                  className="flex-[2] h-14 bg-mosque text-white font-bold rounded-xl shadow-lg shadow-mosque/20"
                >
                  {isLoading ? 'Finalizing...' : 'Complete Setup'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
