import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import LetterBox from './components/LetterBox';
import DropZone from './components/DropZone';
import ImageDisplay from './components/ImageDisplay';

const Activity = () => {
  const [generatedWord, setGeneratedWord] = useState('');
  const [difficulty, setDifficulty] = useState('easy'); // Nueva dificultad

  const handleWordGenerated = (word) => {
    setGeneratedWord(word); // Establecer la palabra generada a partir de la imagen
  };

  const handleLetterDrop = (letter) => {
    // Aquí agregamos la lógica para cuando el niño completa la palabra
    if (generatedWord.toLowerCase().startsWith(letter.toLowerCase())) {
      // Lógica para verificar las letras ingresadas y completar la palabra
    }
  };

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Lenguaje - Tablero de Letras</h1>
        
        <div className="mb-4">
          <label htmlFor="difficulty">Selecciona la dificultad:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="ml-2 border-2 p-2"
          >
            <option value="easy">Fácil</option>
            <option value="medium">Medio</option>
            <option value="hard">Difícil</option>
          </select>
        </div>
        
        {/* Mostrar la imagen basada en la dificultad seleccionada */}
        <ImageDisplay difficulty={difficulty} onWordGenerated={handleWordGenerated} />
        
        <DropZone targetWord={generatedWord} onWordComplete={handleLetterDrop} />
        <LetterBox />
      </div>
    </DndProvider>
  );
};

export default Activity;
