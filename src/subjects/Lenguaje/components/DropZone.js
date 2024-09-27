import React from 'react';
import { useDrop } from 'react-dnd';

const vowels = ['A', 'E', 'I', 'O', 'U'];

const DropZone = ({ targetWord, enteredLetters, setEnteredLetters, onWordComplete }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'LETTER',
    drop: (item) => handleLetterDrop(item.letter),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [enteredLetters]);

  const handleLetterDrop = (letter) => {
    const emptyIndex = enteredLetters.findIndex((l) => l === null);
    if (emptyIndex === -1) return;

    const updatedLetters = [...enteredLetters];
    updatedLetters[emptyIndex] = letter;
    setEnteredLetters(updatedLetters);

    if (updatedLetters.every((l) => l !== null)) {
      const formedWord = updatedLetters.join('').toLowerCase();
      if (formedWord === targetWord.toLowerCase()) {
        onWordComplete(true);
      } else {
        onWordComplete(false);
      }
    }
  };

  const getColorForLetter = (letter) => {
    if (!letter) return 'bg-white';
    return vowels.includes(letter.toUpperCase()) ? 'bg-blue-500 text-white' : 'bg-red-500 text-white';
  };

  return (
    <div
      ref={drop}
      className={`w-full max-w-xs sm:max-w-sm lg:max-w-lg xl:max-w-2xl p-1 sm:p-2 bg-gray-200 rounded-lg grid grid-cols-${targetWord.length} gap-1 sm:gap-2 ${isOver ? 'border-4 border-yellow-500' : 'border-2 border-gray-400'}`}
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      {enteredLetters.map((letter, index) => (
        <div
          key={index}
          className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg rounded-md ${getColorForLetter(letter)} border-2 border-gray-400`}
        >
          {letter ? letter.toUpperCase() : ''}
        </div>
      ))}
    </div>
  );
};

export default DropZone;
