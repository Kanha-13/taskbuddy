import React from 'react';

interface CrossIconProps {
  size?: number; // Size of the icon (both width and height)
  color?: string; // Color of the cross
}

const CrossIcon: React.FC<CrossIconProps> = ({ size = 24, color = 'black' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
};

export default CrossIcon;
