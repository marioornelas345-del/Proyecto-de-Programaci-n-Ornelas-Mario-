'use client'

import React, { useState } from 'react'
import { Button } from './Button'
import { toast } from 'sonner'

interface ScheduleVisitModalProps {
  isOpen: boolean
  onClose: () => void
  propertyName: string
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({ 
  isOpen, 
  onClose, 
  propertyName 
}) => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) {
      toast.error('Please select both a date and a time for your visit.')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Visit scheduled for ${propertyName} on ${selectedDate} at ${selectedTime}!`)
      setIsSubmitting(false)
      onClose()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-bg-dark/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-bg-light flex justify-between items-center bg-mosque/5">
          <div>
            <h3 className="text-2xl font-bold text-nordic-dark">Schedule a Private Viewing</h3>
            <p className="text-nordic-muted text-sm mt-1">{propertyName}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center text-nordic-muted hover:text-red-500 transition-all shadow-sm"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-4">
            <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider flex items-center gap-2">
              <span className="material-icons text-mosque text-lg">event</span>
              Select Date
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, i) => {
                const date = new Date()
                date.setDate(date.getDate() + i + 1)
                const dateStr = date.toISOString().split('T')[0]
                const isSelected = selectedDate === dateStr
                
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected 
                        ? 'bg-mosque border-mosque text-white shadow-lg shadow-mosque/20 scale-105' 
                        : 'border-bg-light hover:border-mosque/30 text-nordic-muted hover:text-nordic-dark bg-bg-light/30'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase opacity-60 mb-1">{day}</div>
                    <div className="text-sm font-bold">{date.getDate()} {date.toLocaleString('en-US', { month: 'short' })}</div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider flex items-center gap-2">
              <span className="material-icons text-mosque text-lg">schedule</span>
              Select Time Slot
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'].map((time) => {
                const isSelected = selectedTime === time
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 rounded-lg border text-xs font-bold transition-all ${
                      isSelected 
                        ? 'bg-mosque border-mosque text-white shadow-lg shadow-mosque/20' 
                        : 'border-bg-light hover:border-mosque/30 text-nordic-muted bg-bg-light/30'
                    }`}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-bold shadow-xl shadow-mosque/20"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Requesting...
                </div>
              ) : (
                'Confirm Request'
              )}
            </Button>
            <p className="text-center text-[11px] text-nordic-muted mt-4">
              An elite agent will contact you within 2 hours to confirm your private tour.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
