import React from 'react';
import { useDrag } from 'react-dnd';
import { speak } from '../../../utils/voiceService'; // Asegúrate de que la función speak esté bien importada
import { isMobile } from 'react-device-detect'; // Detectar si es un dispositivo móvil

const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const vowels = ['A', 'E', 'I', 'O', 'U'];

const LetterBox = () => {
  return (
    <div className="p-4">
      {/* Ajustamos las columnas y tamaños dependiendo del tamaño de pantalla */}
      <div className={`grid ${isMobile ? 'grid-cols-6 gap-1' : 'grid-cols-8 gap-3 lg:grid-cols-10 lg:gap-4'} border-4 border-yellow-600 p-1 lg:p-4 rounded-lg shadow-lg`}>
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

  const handleClick = () => {
    speak(letter); // Usar la función speak para generar la voz desde el backend
  };

  return (
    <div
      ref={drag}
      onClick={handleClick}
      className={`flex items-center justify-center font-bold 
                  ${isMobile ? 'text-2xl h-10 w-10' : 'text-3xl h-14 w-14 sm:text-4xl sm:h-16 sm:w-16 lg:text-5xl lg:h-20 lg:w-20'} 
                  border-2 border-gray-300 rounded-md shadow-md cursor-pointer notranslate ${color} 
                  transition-transform transform hover:scale-105`}
      style={{
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1, // Ajuste para que se vea más claro que se está arrastrando
      }}
    >
      {letter}
    </div>
  );
};

export default LetterBox;
