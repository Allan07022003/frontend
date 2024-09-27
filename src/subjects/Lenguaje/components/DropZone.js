import React from 'react';
import { useDrop } from 'react-dnd';
import { useAssistant } from '../../../context/AssistantContext';

const vowels = ['A', 'E', 'I', 'O', 'U']; // Definir las vocales

const DropZone = ({ targetWord, enteredLetters, setEnteredLetters, onWordComplete, attempts, setAttempts }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'LETTER',
    drop: (item) => handleLetterDrop(item.letter),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [enteredLetters]);

  const { showAssistantMessage } = useAssistant();

  const handleLetterDrop = (letter) => {
    const emptyIndex = enteredLetters.findIndex((l) => l === null);

    // Si no hay espacio disponible, no hace nada
    if (emptyIndex === -1) return;

    // Validar si la letra corresponde con la letra de la palabra en esa posición
    if (letter.toLowerCase() === targetWord[emptyIndex].toLowerCase()) {
      const updatedLetters = [...enteredLetters];
      updatedLetters[emptyIndex] = letter;
      setEnteredLetters(updatedLetters);

      // Verificar si la palabra está completa
      if (updatedLetters.every((l) => l !== null)) {
        const formedWord = updatedLetters.join('').toLowerCase();
        if (formedWord === targetWord.toLowerCase()) {
          onWordComplete(true); // Palabra correcta
        } else {
          onWordComplete(false); // Palabra incorrecta
        }
      }
    } else {
      // Mostrar alerta si la letra no es correcta
      showAssistantMessage(`La letra '${letter}' no es correcta para esta posición.`, 'error');
    }
  };

  const getColorForLetter = (letter) => {
    if (!letter) return 'bg-white'; // Si no hay letra, usar fondo blanco
    return vowels.includes(letter.toUpperCase()) ? 'bg-blue-500 text-white' : 'bg-red-500 text-white';
  };

  return (
    <div
      ref={drop}
      className={`w-full max-w-md sm:max-w-lg p-1 sm:p-2 bg-gray-200 rounded-lg grid grid-cols-${targetWord.length} gap-1 sm:gap-2 ${isOver ? 'border-4 border-yellow-500' : 'border-2 border-gray-400'}`}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      {enteredLetters.map((letter, index) => (
        <div
          key={index}
          className={`h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center font-bold text-sm sm:text-base rounded-md ${getColorForLetter(letter)} border-2 border-gray-400`}
        >
          {letter ? letter.toUpperCase() : ''}
        </div>
      ))}
    </div>
  );
};

export default DropZone;
