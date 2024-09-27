import React from 'react';

const Navigation = ({ currentIndex, total, onNext, onPrevious }) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <button
        className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-lg ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => {
          console.log('Botón Anterior presionado');
          onPrevious();
        }}
        disabled={currentIndex === 0}
      >
        Anterior
      </button>
      <span className="mx-4">{currentIndex + 1} / {total}</span>
      <button
        className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentIndex === total - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => {
          console.log('Botón Siguiente presionado');
          onNext();
        }}
        disabled={currentIndex === total - 1}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Navigation;
