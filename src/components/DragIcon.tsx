import React from 'react'

const DragIcon: React.FC = () => {
  return (
    <div className="mr-4 cursor-grab">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="#A7A7A7"
        className="w-5 h-5"
      >
        <circle cx="5" cy="5" r="1.5" fill="#A7A7A7" />
        <circle cx="5" cy="12" r="1.5" fill="#A7A7A7" />
        <circle cx="5" cy="19" r="1.5" fill="#A7A7A7" />
        <circle cx="12" cy="5" r="1.5" fill="#A7A7A7" />
        <circle cx="12" cy="12" r="1.5" fill="#A7A7A7" />
        <circle cx="12" cy="19" r="1.5" fill="#A7A7A7" />
      </svg>
    </div>
  )
}

export default DragIcon