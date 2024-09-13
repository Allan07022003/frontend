import React from 'react';
import './Tira.css';  // Importa el archivo de estilos actualizado

const Tira = ({ length, number, color, onDragStart }) => {
    return (
        <div
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('tiraLength', length); // Guardar la longitud en dataTransfer
                onDragStart(e, length); // Asegurar que se pasa el length al evento onDragStart
            }}
            className={`tira ${color} flex items-center justify-center text-white font-bold`}
            style={{ '--length': length }} // Aseguramos que el tamaño de la tira sea proporcional
        >
            {number}
        </div>
    );
};

export default Tira;
