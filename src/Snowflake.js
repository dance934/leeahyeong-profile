import React from 'react';

const Snowflake = ({ id, size, position, animationDuration }) => {
  const style = {
    position: 'absolute',
    top: '-20px', // Start above the viewport
    left: `${position}vw`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: 'transparent',
    borderRadius: '0%',
    opacity: Math.random() * 0.7 + 0.3, // Random opacity
    filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.5))', // Soften the edges and add a subtle glow
    animation: `fall ${animationDuration}s linear infinite`,
    zIndex: 9999,
  };

  return (
    <svg className="snowflake" style={style} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
};

export default Snowflake;
