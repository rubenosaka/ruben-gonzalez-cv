interface CalloutProps {
  children: React.ReactNode
  variant?: 'info' | 'warning' | 'success'
  className?: string
}

export function Callout({
  children,
  variant = 'info',
  className = '',
}: CalloutProps) {
  const variants = {
    info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100',
    warning:
      'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100',
    success:
      'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100',
  }

  return (
    <div
      className={`mb-6 rounded-lg border p-4 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  )
}
