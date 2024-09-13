import React from 'react';
import './Tira.css';  // Importa el archivo de estilos actualizado

const Tira = ({ length, number, color, onDragStart }) => {
    const handleTouchStart = (e) => {
        e.dataTransfer = {
            setData: () => {} // Para evitar errores ya que dataTransfer no está disponible en eventos táctiles
        };
        onDragStart(e, length); // Manejar el evento táctil como si fuera un arrastre
    };

    return (
        <div
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('tiraLength', length); // Guardar la longitud en dataTransfer
                onDragStart(e, length); // Asegurar que se pasa el length al evento onDragStart
            }}
            onTouchStart={handleTouchStart} // Manejar el tacto
            className={`tira ${color} flex items-center justify-center text-white font-bold`}
            style={{ '--length': length }} // Aseguramos que el tamaño de la tira sea proporcional
        >
            {number}
        </div>
    );
};

export default Tira;
