import React, { useState, useEffect } from 'react';
import './Album.css';
import allImages from './albumImages';

const Album = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="album-container">
      <div className="album-display">
        {allImages.length > 0 ? (
          <img 
            src={process.env.PUBLIC_URL + allImages[currentImageIndex]}
            alt={`Album photo ${currentImageIndex + 1}`}
            className="album-image"
          />
        ) : (
          <p>No images in the album.</p>
        )}
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrevImage}>Previous</button>
        <button onClick={handleNextImage}>Next</button>
      </div>
    </div>
  );
};

export default Album;