import React from 'react';
import { useDrop } from 'react-dnd';

const speak = (text) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Idioma español
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes('Google') && voice.lang === 'es-ES');
    speechSynthesis.speak(utterance);
  } else {
    console.error('La API de síntesis de voz no es compatible con este navegador.');
  }
};

const DropZone = ({ completedPhrase }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'LETTER',
    drop: () => {
      // Llamar a la función de voz para leer la frase completa
      speak(completedPhrase);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-full h-24 border-4 ${isOver ? 'border-green-500' : 'border-gray-300'} rounded-lg flex justify-center items-center`}
    >
      {isOver ? '¡Suelta aquí!' : 'Zona para soltar'}
    </div>
  );
};

export default DropZone;
