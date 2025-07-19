import React, { useState, useEffect } from 'react';
import Snowflake from './Snowflake';

const Snowfall = ({ numberOfSnowflakes = 50 }) => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const generateSnowflakes = () => {
      const newSnowflakes = [];
      for (let i = 0; i < numberOfSnowflakes; i++) {
        newSnowflakes.push({
          id: i,
          size: Math.random() * 5 + 10, // Size between 10 and 20px
          position: Math.random() * (100 - 5), // Position across the width, accounting for size
          animationDuration: Math.random() * 10 + 5, // Duration between 5 and 15 seconds
        });
      }
      setSnowflakes(newSnowflakes);
    };

    setTimeout(() => {
      generateSnowflakes();
    }, 3000); // Delay to allow the component to mount before generating snowflakes

    // Add keyframes for snowflake animation to the head of the document
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes fall {
        to {
          transform: translateY(100vh);
        }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [numberOfSnowflakes]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9998 }}>
      {snowflakes.map((snowflake) => (
        <Snowflake key={snowflake.id} {...snowflake} />
      ))}
    </div>
  );
};

export default Snowfall;
