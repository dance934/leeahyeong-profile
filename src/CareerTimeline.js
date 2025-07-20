import React from 'react';
import { Card } from 'react-bootstrap';
import './CareerTimeline.css';

const careerEvents = [
  { year: '2023年', description: '加入台灣職棒富邦悍將啦啦隊Fubon Angels' },
  { year: '2020年', description: '轉戰韓國職棒KT巫師啦啦隊' },
  { year: '2018年', description: '擔任韓國職棒NC恐龍啦啦隊' },
  { year: '2015年', description: '以啦啦隊員身份出道' },
];

function CareerTimeline() {
  const circleRadius = 15;
  const topOffset = 10; // Amount to move the top circle down
  const eventHeight = 120; // Approximate height of each event card + spacing
  const totalContentHeight = careerEvents.length * eventHeight; // Total height for event cards
  const svgTotalHeight = totalContentHeight + 2 * circleRadius + topOffset; // Total SVG height including circles and offset

  return (
    <div className="tree-timeline-container" style={{ height: `${svgTotalHeight}px` }}>
      <svg className="tree-svg" viewBox={`0 0 100 ${svgTotalHeight}`}>
        {/* Tree Trunk - middle part */}
        <rect x="47" y={circleRadius + topOffset} width="6" height={totalContentHeight} fill="#8B4513" />
        
        {/* career circles */}
        {careerEvents.map((event, index) => {
          return (
            <circle
              key={index}
              cx="50"
              cy={eventHeight / 1.5 + index * eventHeight}
              r={circleRadius}
              fill="#8B4513"
            />
          );
        })}

        {/* No branches here, they will be drawn by CSS pseudo-elements */}
      </svg>
      {careerEvents.map((event, index) => {
        const branchY = circleRadius + topOffset + (index * eventHeight) + (eventHeight / 2);
        const isLeft = index % 2 === 0;

        return (
          <div
            className={`timeline-event-card ${isLeft ? 'left' : 'right'}`}
            key={index}
            style={{ top: `${branchY - (eventHeight / 2)}px` }} // Adjust top to center card with branch
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