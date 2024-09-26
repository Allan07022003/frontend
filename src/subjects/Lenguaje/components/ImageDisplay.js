import React, { useState, useEffect } from 'react';
import { fetchRandomImageFromPixabay } from '../../../utils/pixabayService'; // Importar la función que trae la imagen desde Pixabay

const ImageDisplay = ({ difficulty }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [word, setWord] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            const result = await fetchRandomImageFromPixabay(difficulty);
            if (result) {
                setImageUrl(result.imageUrl);
                setWord(result.word);
            }
        };

        fetchImage();
    }, [difficulty]);

    return (
        <div className="mt-4">
            {imageUrl ? (
                <div>
                    <img src={imageUrl} alt={word} className="w-48 h-48 object-cover" />
                    <p>Palabra a formar: {word}</p>
                </div>
            ) : (
                <p>Cargando imagen...</p>
            )}
        </div>
    );
};

export default ImageDisplay;
