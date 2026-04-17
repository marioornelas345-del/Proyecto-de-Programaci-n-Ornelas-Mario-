'use client'

import React, { useState } from 'react'
import { ContactForm } from './ContactForm'
import { ScheduleVisitModal } from './ScheduleVisitModal'

interface PropertyActionsProps {
  propertyName: string
}

export const PropertyActions: React.FC<PropertyActionsProps> = ({ propertyName }) => {
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false)

  return (
    <div className="space-y-4">
      <button 
        onClick={() => setIsVisitModalOpen(true)}
        className="w-full bg-mosque hover:bg-opacity-95 text-white py-5 px-6 rounded-2xl font-bold transition-all shadow-xl shadow-mosque/20 flex items-center justify-center gap-3 group"
      >
        <span className="material-icons text-xl group-hover:scale-110 transition-transform">calendar_today</span>
        Schedule Visit
      </button>
      
      <div className="p-6 bg-bg-light/50 rounded-2xl border border-nordic-muted/5">
        <h4 className="font-bold text-nordic-dark mb-4">Express Interest</h4>
        <ContactForm />
      </div>

      <ScheduleVisitModal 
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
        propertyName={propertyName}
      />
    </div>
  )
}
