import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  const baseStyles = 'w-full px-4 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
  const errorStyles = error ? 'border-red-500' : 'border-nordic-muted'
  const combinedStyles = `${baseStyles} ${errorStyles} ${className}`

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium text-nordic-dark">
          {label}
        </label>
      )}
      <input className={combinedStyles} {...props} />
      {error && (
        <span className="text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  )
}
