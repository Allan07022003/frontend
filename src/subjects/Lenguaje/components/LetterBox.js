import React from 'react';
import { useDrag, useDragLayer } from 'react-dnd';
import { speak } from '../../../utils/voiceService'; // Asegúrate de que la función speak esté bien importada
import { isMobile } from 'react-device-detect'; // Detectar si es un dispositivo móvil

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const vowels = ['A', 'E', 'I', 'O', 'U', 'Ñ'];

const LetterBox = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-2 border-4 border-yellow-600 p-2 rounded-lg shadow-lg">
        {letters.map((letter, index) => (
          <Letter key={index} letter={letter} />
        ))}
      </div>
      {/* Renderizar el layer personalizado solo si es móvil */}
      {isMobile && <CustomDragLayer />}
    </div>
  );
};

// Este componente se encarga de mostrar el arrastre en móviles
const CustomDragLayer = () => {
  const { item, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getClientOffset(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;

  return (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        transform: transform,
        WebkitTransform: transform,
      }}
    >
      <div
        className="flex items-center justify-center font-bold text-4xl h-16 w-16 border-2 border-gray-300 rounded-md shadow-md bg-yellow-500 text-white"
        style={{ opacity: 0.8 }}
      >
        {item.letter}
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
      className={`flex items-center justify-center font-bold text-4xl h-20 w-20 sm:h-16 sm:w-16 border-2 border-gray-300 rounded-md shadow-md cursor-pointer notranslate ${color} transition-transform transform hover:scale-105`}
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
