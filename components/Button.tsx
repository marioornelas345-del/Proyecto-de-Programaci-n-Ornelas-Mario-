import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none'
  
  const variants = {
    primary: 'bg-primary text-bg-dark hover:bg-opacity-90',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-bg-dark',
    ghost: 'bg-transparent text-primary hover:bg-bg-light',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  }

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  )
}
