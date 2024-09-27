import React from 'react';
import { useDrop } from 'react-dnd';

const WordSlot = ({ index, letter, onLetterDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'LETTER',
    drop: (item) => onLetterDrop(item.letter), // Soltar la letra en el slot
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center bg-white border-2 border-gray-400 font-bold text-2xl sm:text-3xl rounded-md shadow-md ${isOver ? 'bg-yellow-100' : ''}`}
    >
      {letter && (
        <div className="flex items-center justify-center h-full w-full bg-blue-500 text-white rounded-md">
          {letter}
        </div>
      )}
    </div>
  );
};

export default WordSlot;
