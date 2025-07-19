import React, { useRef, useState, useEffect } from 'react';
import { Navbar, Nav, Container, Card, Row, Col, Button } from 'react-bootstrap';
import ScheduleCalendar from './ScheduleCalendar';
import Snowfall from './Snowfall';
import QuizGame from './QuizGame';
import FanAssistant from './FanAssistant';
import Album from './Album';

function App() {
  const videoRowRef = useRef(null);
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('videoLikes');
    return savedLikes ? JSON.parse(savedLikes) : {};
  });
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFanAssistant, setShowFanAssistant] = useState(false);
  const [showAlbum, setShowAlbum] = useState(false);
  const [expanded, setExpanded] = useState(false); // Add expanded state for Navbar

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

  const handleNavigate = (targetId) => {
    const navigate = () => {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (showQuiz || showFanAssistant || showAlbum) {
      setShowQuiz(false);
      setShowFanAssistant(false);
      setShowAlbum(false);
      // Wait for the DOM to update before scrolling
      setTimeout(navigate, 100);
    } else {
      navigate();
    }
    setExpanded(false); // Close Navbar on navigation
  };

  return (
    <div className="App">
      <Snowfall />
      <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
        <Container>
          <Navbar.Brand href="#home" onClick={(e) => { e.preventDefault(); handleNavigate('#profile'); }}>李雅英 (Lee Ah-yeong)</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#profile" onClick={(e) => { e.preventDefault(); handleNavigate('#profile'); }}>基本資料</Nav.Link>
              <Nav.Link onClick={() => { setShowAlbum(true); setShowQuiz(false); setShowFanAssistant(false); setExpanded(false); }}>相片</Nav.Link>
              <Nav.Link href="#videos" onClick={(e) => { e.preventDefault(); handleNavigate('#videos'); }}>影片</Nav.Link>
              <Nav.Link href="#schedule" onClick={(e) => { e.preventDefault(); handleNavigate('#schedule'); }}>排班表</Nav.Link>
              <Nav.Link onClick={() => { setShowQuiz(true); setShowFanAssistant(false); setExpanded(false); }}>粉絲小遊戲</Nav.Link>
              <Nav.Link onClick={() => { setShowFanAssistant(true); setShowQuiz(false); setExpanded(false); }}>智能小英</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container style={{ marginTop: '2rem' }}>
        {showQuiz ? (
          <QuizGame onGameOver={() => setShowQuiz(false)} />
        ) : showFanAssistant ? (
          <FanAssistant onBack={() => setShowFanAssistant(false)} />
        ) : showAlbum ? (
          <Album />
        ) : (
          <>
            <section id="profile" style={{ marginBottom: '2rem' }}>
              <h2>基本資料</h2>
              <Card>
                <Row noGutters>
                  <Col md={3}>
                    <Card.Img src={process.env.PUBLIC_URL + "/images/leeahyeong-1.jpg"} style={{ objectFit: 'cover', height: '100%' }} />
                  </Col>
                  <Col md={9}>
                    <Card.Body>
                      <Card.Title>李雅英 (Lee Ah-yeong)</Card.Title>
                      <Card.Text as="div">
                        <ul>
                          <li><strong>出生日期:</strong> 1992年2月9日</li>
                          <li><strong>身高:</strong> 170公分</li>
                          <li><strong>職業:</strong> 啦啦隊員</li>
                          <li>
                            <strong>Instagram:</strong> 
                            <a href="https://www.instagram.com/yyyoungggggg/?hl=zh-tw" target="_blank" rel="noopener noreferrer">
                              yyyoungggggg
                            </a>
                          </li>
                        </ul>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </section>

            <section id="videos">
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
                      <Col xs={12} md={4} key={index} style={{ marginBottom: '1rem' }}>
                        <Card>
                          <Card.Body>
                            <div className="embed-responsive" style={{ paddingBottom: '177.78%', position: 'relative', height: 0, overflow: 'hidden' }}>
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
            </section >

            <section id="schedule" style={{ marginBottom: '2rem' }}>
              <h2>排班表</h2>
              <ScheduleCalendar />
            </section>
          </>
        )}
      </Container >
    </div >
  );
}

export default App;