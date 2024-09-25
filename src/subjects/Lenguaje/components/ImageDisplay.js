import React, { useState, useEffect } from 'react';
import { fetchRandomImageFromPixabay } from '../../../utils/pixabayService'; // Traer imagen desde Pixabay

const ImageDisplay = ({ difficulty, onWordGenerated }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [generatedWord, setGeneratedWord] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const result = await fetchRandomImageFromPixabay(difficulty);
      if (result) {
        setImageUrl(result.imageUrl);
        setGeneratedWord(result.word); // Aquí pasamos la palabra al padre o componente que la necesita
        onWordGenerated(result.word); // Notificar al padre que se generó una nueva palabra
      }
    };

    fetchImage();
  }, [difficulty, onWordGenerated]);

  return (
    <div className="mt-4">
      {imageUrl ? (
        <img src={imageUrl} alt={generatedWord} className="w-48 h-48 object-cover" />
      ) : (
        <p>Cargando imagen...</p>
      )}
    </div>
  );
};

export default ImageDisplay;
