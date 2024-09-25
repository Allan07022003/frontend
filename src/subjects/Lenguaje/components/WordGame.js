import React, { useState, useEffect } from 'react';
import LetterBox from './LetterBox';
import DropZone from './DropZone';
import ImageDisplay from './ImageDisplay';
import { fetchRandomImageFromPixabay } from '../../../utils/pixabayService'; 

const WordGame = ({ difficulty }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    generateNewImage();
  }, [difficulty]);

  const generateNewImage = async () => {
    const result = await fetchRandomImageFromPixabay(difficulty);
    if (result) {
      setImageUrl(result.imageUrl);
      setCurrentWord(result.word);
    }
  };

  const handleWordComplete = () => {
    alert(`¡Palabra "${currentWord}" completada correctamente!`);
    generateNewImage(); // Generar una nueva imagen después de completar la palabra
  };

  return (
    <div className="flex flex-col items-center">
      <ImageDisplay imageUrl={imageUrl} /> {/* Mostrar la imagen */}
      <DropZone targetWord={currentWord} onWordComplete={handleWordComplete} />
      <LetterBox />
    </div>
  );
};

export default WordGame;
