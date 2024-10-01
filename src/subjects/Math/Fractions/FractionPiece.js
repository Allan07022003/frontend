import React from 'react';

const FractionPiece = ({ fraction, color, label, onDragStart, onDragEnd }) => {
  return (
    <div
      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-white text-xs sm:text-sm md:text-base lg:text-lg font-bold cursor-pointer"
      style={{ backgroundColor: color }}
      draggable="true"
      onDragStart={(e) => {
        const pieceData = { fraction, color };
        e.dataTransfer.setData('piece', JSON.stringify(pieceData));
        e.target.style.opacity = "1";
      }}
      onDragEnd={onDragEnd}
    >
      {label}
    </div>
  );
};

export default FractionPiece;
