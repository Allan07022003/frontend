import React from 'react';
import { useDrag } from 'react-dnd';
import { speak } from '../../../utils/voiceService'; // Asegúrate de que la función speak esté bien importada

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const vowels = ['A', 'E', 'I', 'O', 'U', 'Ñ'];

const LetterBox = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 border-4 border-yellow-600 p-2 rounded-lg shadow-lg">
        {letters.map((letter, index) => (
          <Letter key={index} letter={letter} />
        ))}
      </div>
    </div>
  );
};

const Letter = ({ letter }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
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

  const handleClick = () => {
    speak(letter); // Usar la función speak para generar la voz desde el backend
  };

  return (
    <div
      ref={drag}
      onClick={handleClick} // Llamar a speak cuando se haga clic
      className={`flex items-center justify-center font-bold text-4xl h-16 w-16 border-2 border-gray-300 rounded-md shadow-md cursor-pointer notranslate ${color} transition-transform transform hover:scale-105`}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        opacity: isDragging ? 1 : 1,
      }}
    >
      {letter}
    </div>
  );
};

export default LetterBox;
