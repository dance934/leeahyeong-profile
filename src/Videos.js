import React, { useRef, useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import './Videos.css';

const Videos = () => {
  const videoRowRef = useRef(null);
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('videoLikes');
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  useEffect(() => {
    localStorage.setItem('videoLikes', JSON.stringify(likes));
  }, [likes]);

  const handleLike = (videoId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [videoId]: (prevLikes[videoId] || 0) + 1,
    }));
  };

  const scroll = (direction) => {
    if (videoRowRef.current) {
      const scrollAmount = 300; // Adjust as needed
      if (direction === 'left') {
        videoRowRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        videoRowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="videos" className="videos-page">
      <h2>影片</h2>
      <div className="video-carousel-container">
        <div className="d-flex justify-content-end mb-2">
          <Button variant="secondary" className="scroll-button left me-2" onClick={() => scroll('left')}>&lt;</Button>
          <Button variant="secondary" className="scroll-button right" onClick={() => scroll('right')}>&gt;</Button>
        </div>
        <div ref={videoRowRef} className="video-scroll-wrapper flex-grow-1 overflow-auto pb-3 custom-scrollbar">
          <Row className="flex-nowrap ">
            {[
              "z6yXVoF_UR8",
              "ZNI0KlV0GG0",
              "GHjh6nGxI0A",
              "hj0XRkFVadk",
            ].map((videoId, index) => (
              <Col xs={12} md={6} key={index} style={{ marginBottom: '1rem' }}>
                <Card>
                  <Card.Body>
                    <div className="embed-responsive" style={{ position: 'relative', height: 0, overflow: 'hidden' }}>
                      <iframe
                        className="embed-responsive-item"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        allowFullScreen
                        title={`YouTube video ${index + 1}`}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      ></iframe>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <Button variant="light" onClick={() => handleLike(videoId)}>
                        ❤️ {likes[videoId] || 0}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
};

export default Videos;
