import React from 'react';
import './Tira.css';

const Tira = ({ length, number, color, onDragStart }) => {
    const handleTouchStart = (e) => {
        // No usar preventDefault para evitar conflictos con eventos pasivos
        const touch = e.touches[0];
        const target = e.target;

        // Crear un evento de arrastre falso para simularlo en dispositivos táctiles
        const fakeDragStart = new Event('dragstart');
        fakeDragStart.dataTransfer = {
            data: {},
            setData(type, val) {
                this.data[type] = val;
            },
            getData(type) {
                return this.data[type];
            }
        };
        fakeDragStart.dataTransfer.setData('tiraLength', length);

        // Llamar a onDragStart simulando un arrastre
        onDragStart(fakeDragStart);

        const handleTouchMove = (moveEvent) => {
            const moveTouch = moveEvent.touches[0];
            target.style.position = 'absolute';
            target.style.left = `${moveTouch.clientX - target.offsetWidth / 2}px`;
            target.style.top = `${moveTouch.clientY - target.offsetHeight / 2}px`;
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            target.style.position = '';
            target.style.left = '';
            target.style.top = '';
        };

        // Adjuntar los listeners de movimiento y finalización del evento táctil como no pasivos
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd, { passive: false });
    };

    return (
        <div
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('tiraLength', length); // Guardar la longitud en dataTransfer para eventos de mouse
                onDragStart(e); // Manejar arrastre con mouse
            }}
            onTouchStart={handleTouchStart} // Manejar táctil simulando arrastre
            className={`tira ${color} flex items-center justify-center text-white font-bold`}
            style={{ '--length': length }}
        >
            {number}
        </div>
    );
};

export default Tira;
