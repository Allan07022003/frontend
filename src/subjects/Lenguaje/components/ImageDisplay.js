import React from 'react';

const ImageDisplay = ({ imageUrl }) => {
  return (
    <div className="my-4 flex justify-center items-center w-full">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Imagen generada"
          className="w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg h-auto object-contain"
          style={{ maxHeight: '200px', marginBottom: '0.5rem' }}
        />
      ) : (
        <p>Cargando imagen...</p>
      )}
    </div>
  );
};

export default ImageDisplay;
