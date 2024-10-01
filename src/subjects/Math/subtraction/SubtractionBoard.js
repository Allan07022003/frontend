import React from 'react';
import { useDrop } from 'react-dnd';

const SubtractionBoard = ({ handleDrop, coveredCells, minuendo }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TIRA',
    drop: (item) => {
      handleDrop(item.number, item.length, item.color);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className="board-container"
      style={{ gridTemplateColumns: `repeat(${minuendo}, 1fr)` }}
    >
      {[...Array(minuendo)].map((_, index) => {
        const number = index + 1;
        const isCovered = coveredCells.includes(number);

        return (
          <div
            key={index}
            className={`board-cell ${isCovered ? 'bg-blue-500' : ''}`}
          >
            <span className={isCovered ? 'text-white' : ''}>{number}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SubtractionBoard;
