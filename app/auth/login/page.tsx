import React from 'react'
import { LoginForm } from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-light">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mosque/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="w-full py-20 px-4 relative z-10">
        <LoginForm />
        
        <div className="mt-12 text-center">
          <p className="text-nordic-muted text-sm max-w-xs mx-auto">
            By signing in, you agree to our 
            <a href="#" className="text-nordic-dark font-semibold hover:underline mx-1">Terms of Service</a> 
            and 
            <a href="#" className="text-nordic-dark font-semibold hover:underline ml-1">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
