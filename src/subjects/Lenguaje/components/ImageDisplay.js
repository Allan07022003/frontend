import React, { useState, useEffect } from 'react';
import { fetchImageFromPixabay } from '../../../utils/pixabayService'; // Traer imagen desde Pixabay

const ImageDisplay = ({ word }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const url = await fetchImageFromPixabay(word);
      setImageUrl(url);
    };

    fetchImage();
  }, [word]);

  return (
    <div className="mt-4">
      {imageUrl ? (
        <img src={imageUrl} alt={word} className="w-48 h-48 object-cover" />
      ) : (
        <p>No se encontró una imagen para "{word}"</p>
      )}
    </div>
  );
};

export default ImageDisplay;
