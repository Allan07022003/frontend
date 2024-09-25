import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import LetterBox from './components/LetterBox';
import DropZone from './components/DropZone';

const Activity = () => {
  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Lenguaje - Tablero de Letras</h1>
        <LetterBox />
        <DropZone /> 
      </div>
    </DndProvider>
  );
};

export default Activity;
