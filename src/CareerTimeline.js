import React from 'react';
import { Card } from 'react-bootstrap';
import './CareerTimeline.css';

const careerEvents = [
  { year: '2015年', description: '以啦啦隊員身份出道' },
  { year: '2018年', description: '擔任韓國職棒NC恐龍啦啦隊' },
  { year: '2020年', description: '轉戰韓國職棒KT巫師啦啦隊' },
  { year: '2023年', description: '加入台灣職棒富邦悍將啦啦隊Fubon Angels' },
];

function CareerTimeline() {
  const eventHeight = 120; // Approximate height of each event card + spacing
  const svgHeight = careerEvents.length * eventHeight + 50; // Adjust SVG height based on number of events

  return (
    <div className="tree-timeline-container" style={{ height: `${svgHeight}px` }}>
      <svg className="tree-svg" viewBox={`0 0 100 ${svgHeight}`}>
        {/* Tree Trunk */}
        <rect x="48" y="0" width="4" height={svgHeight} fill="#8B4513" />
        {/* No branches here, they will be drawn by CSS pseudo-elements */}
      </svg>
      {careerEvents.map((event, index) => {
        const yPos = (index * eventHeight) + (eventHeight / 2);
        const isLeft = index % 2 === 0;

        return (
          <div
            className={`timeline-event-card ${isLeft ? 'left' : 'right'}`}
            key={index}
            style={{ top: `${yPos - (eventHeight / 2) + 20}px` }} // Adjust top to center card with branch
          >
            <Card>
              <Card.Body>
                <Card.Title>{event.year}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default CareerTimeline;