import React, { useState } from 'react';
import ImageDisplay from './ImageDisplay';
import { fetchRandomWord } from '../../../utils/wordService'; // Puedes crear un servicio para manejar la lógica de generación

const WordGenerator = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const generateWord = async () => {
    const word = await fetchRandomWord(difficulty);
    setCurrentWord(word);
  };

  return (
    <div className="word-generator">
      <h2>Selecciona la Dificultad:</h2>
      <div className="flex space-x-4">
        <button onClick={() => setDifficulty('easy')} className="bg-green-500 text-white py-2 px-4 rounded">
          Fácil
        </button>
        <button onClick={() => setDifficulty('medium')} className="bg-yellow-500 text-white py-2 px-4 rounded">
          Medio
        </button>
        <button onClick={() => setDifficulty('hard')} className="bg-red-500 text-white py-2 px-4 rounded">
          Difícil
        </button>
      </div>

      <button onClick={generateWord} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Generar Palabra
      </button>

      {currentWord && (
        <>
          <p className="mt-4">Palabra generada: {currentWord}</p>
          <ImageDisplay word={currentWord} />
        </>
      )}
    </div>
  );
};

export default WordGenerator;
