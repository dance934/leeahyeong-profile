import React, { useState, useEffect } from 'react';
import './Album.css';

const Album = () => {
  // In a real application, you would dynamically load these from a server or a build process.
  // For now, manually list the images from public/images/album.
  const allImages = [
    '/images/album/1.webp',
    '/images/album/2.webp',
    // Add more image paths here as you add them to public/images/album
  ];

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