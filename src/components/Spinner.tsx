import React from 'react';

interface SpinnerProps {
  size?: number; 
  color?: string; 
  className?: string; 
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24, color = 'border-blue-500', className }) => {
  return (
    <div 
      className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${color} ${className}`} 
      style={{ width: size, height: size }} 
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;