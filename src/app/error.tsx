'use client'
interface ErrorProps {
  error: string
}

export default function Error({ error }: ErrorProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          ERROR
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">{error}</p>
      </div>
    </div>
  )
}
