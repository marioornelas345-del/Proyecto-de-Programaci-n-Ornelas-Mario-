import React from 'react'
import { SignupForm } from '@/components/SignupForm'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-light">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-mosque/5 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="w-full py-20 px-4 relative z-10">
        <SignupForm />
        
        <div className="mt-12 text-center">
          <p className="text-nordic-muted text-sm max-w-xs mx-auto">
            Experience the next level of real estate service. 
            All members receive complimentary market insights.
          </p>
        </div>
      </div>
    </div>
  )
}
