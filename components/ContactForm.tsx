'use client'

import React, { useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: 'I am interested in this property...',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.message) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSuccess(true)
        setFormData({ name: '', email: '', message: '' })
      }, 1500)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-primary/10 p-8 rounded-2xl border border-primary text-center">
        <span className="material-icons text-mosque text-5xl mb-4">check_circle</span>
        <h3 className="text-xl font-bold text-nordic-dark mb-2">Inquiry Sent!</h3>
        <p className="text-nordic-muted">
          Our senior luxury advisor will contact you within 24 hours.
        </p>
        <Button 
          variant="outline" 
          className="mt-6 w-full"
          onClick={() => setIsSuccess(false)}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        placeholder="John Doe"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        id="name"
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        id="email"
      />
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="message" className="text-sm font-medium text-nordic-dark">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className={`w-full px-4 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            errors.message ? 'border-red-500' : 'border-bg-light'
          }`}
          placeholder="I am interested in this property..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        {errors.message && (
          <span className="text-xs text-red-500">{errors.message}</span>
        )}
      </div>
      <Button 
        type="submit" 
        className="w-full py-4 text-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Inquiry'}
      </Button>
    </form>
  )
}
