import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ targetWord, onWordComplete }) => {
  const [inputWord, setInputWord] = useState('');

  const [{ isOver }, drop] = useDrop({
    accept: 'LETTER',
    drop: (item) => {
      const newWord = inputWord + item.letter;
      setInputWord(newWord);

      if (newWord.toLowerCase() === targetWord.toLowerCase()) {
        onWordComplete();
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`border-4 border-gray-400 h-16 w-full mt-6 rounded-lg p-4 flex justify-center items-center ${
        isOver ? 'bg-green-200' : 'bg-white'
      }`}
    >
      {inputWord || 'Suelta las letras aquí para formar la palabra'}
    </div>
  );
};

export default DropZone;
