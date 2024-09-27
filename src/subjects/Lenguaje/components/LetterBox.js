import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { speak } from '../../../utils/voiceService';

const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const vowels = ['A', 'E', 'I', 'O', 'U'];

const LetterBox = () => {
  useEffect(() => {
    console.log('LetterBox montado');
  }, []);

  return (
    <div className="p-2 sm:p-4 w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto">
      {/* Ajustamos la distribución de columnas para pantallas grandes */}
      <div className={`grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-8 gap-2`}>
        {letters.map((letter, index) => (
          <Letter key={index} letter={letter} />
        ))}
      </div>
    </div>
  );
};

const Letter = ({ letter }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'LETTER',
    item: { letter },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    options: {
      dropEffect: 'move',
    },
  }), []);

  const color = vowels.includes(letter) ? 'bg-blue-500 text-white' : 'bg-red-500 text-white';

  return (
    <div
      ref={drag}
      onClick={() => speak(letter)}
      className={`flex items-center justify-center 
      font-bold text-sm sm:text-base lg:text-lg h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 
      border-2 border-gray-300 rounded-md shadow-md cursor-pointer ${color} 
      transition-transform transform hover:scale-105`}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        opacity: isDragging ? 0.8 : 1,
      }}
    >
      {letter}
    </div>
  );
};

export default LetterBox;
