import React from 'react';
import { useDrag } from 'react-dnd';

const Tira = ({ length, number, color }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TIRA',
    item: { number, length, color },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`tira ${color} ${isDragging ? 'opacity-50' : 'opacity-100'} flex items-center justify-center text-white font-bold`}
      style={{ '--length': length }}  
    >
      {number}
    </div>
  );
};

export default Tira;
