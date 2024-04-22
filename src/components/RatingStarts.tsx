import React from 'react'

interface RenderStarsProps {
  rating: number
}

const RenderStars: React.FC<RenderStarsProps> = ({ rating }) => {
  const stars = []
  let fullStars = 0

  if (rating >= 20 && rating <= 138) {
    fullStars = 1
  } else if (rating >= 139 && rating <= 256) {
    fullStars = 2
  } else if (rating >= 257 && rating <= 374) {
    fullStars = 3
  } else if (rating >= 375 && rating <= 492) {
    fullStars = 4
  } else if (rating >= 493) {
    fullStars = 5
  }

  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-4 h-4 ${i < fullStars ? 'text-yellow-300' : 'text-gray-300'}`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
      </svg>,
    )
  }

  return <div className="flex">{stars}</div>
}

export default RenderStars
