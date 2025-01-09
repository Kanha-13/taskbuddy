import React from 'react'

interface StatusIconProps {
  status: "todo" | "in-progress" | "completed" | "";
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const getColor = (status: "todo" | "in-progress" | "completed" | "") => {
    switch (status) {
      case "todo":
        return "bg-[#A7A7A7]"
      case "in-progress":
        return "bg-[#00BCD4]"
      case "completed":
        return "bg-[#1B8D17]"
    }
  }
  return (
    <div className={`flex items-center justify-center w-5 h-5 ${getColor(status)} text-white rounded-full`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="3"
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  )
}

export default StatusIcon