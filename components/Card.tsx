import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  noPadding?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  noPadding = false,
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-card overflow-hidden transition-shadow hover:shadow-soft'
  const paddingStyles = noPadding ? '' : 'p-6'
  const combinedStyles = `${baseStyles} ${paddingStyles} ${className}`

  return (
    <div className={combinedStyles}>
      {children}
    </div>
  )
}
