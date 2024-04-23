'use client'
import { useAlert } from '@/state/AlertContext'
import React from 'react'

const Alert: React.FC = () => {
  const { alert } = useAlert()

  if (!alert.show) {
    return null
  }

  const alertStyles = {
    info: 'text-accent-900 bg-accent-400 dark:bg-gray-800 dark:text-accent-400',
    error: 'text-danger-50 bg-danger-700 dark:bg-gray-800 dark:text-danger-300',
    success:
      'text-primary-50 bg-primary-600 dark:bg-gray-800 dark:text-primary-400',
    warning:
      'text-secondary-50 bg-secondary-400 dark:bg-gray-800 dark:text-secondary-300',
  }

  const typeClass =
    alertStyles[alert.type] ||
    'text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300'

  return (
    <div
      className={`p-4 mb-4 text-sm rounded-lg fixed top-10 left-1/2 transform -translate-x-1/2 z-50 ${typeClass}`}
      role="alert"
    >
      <span className="font-medium">
        {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
      </span>{' '}
      {alert.message}
    </div>
  )
}

export default Alert
