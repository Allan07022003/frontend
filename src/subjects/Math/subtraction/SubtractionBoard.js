import React from 'react';
import './SubtractionBoard.css';

const SubtractionBoard = ({ handleDrop, coveredCells, minuendo }) => {
    return (
        <div className="board-container" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(40px, 1fr))` }}> {/* Ajuste dinámico de columnas */}
            {[...Array(minuendo)].map((_, index) => {
                const number = index + 1;
                const isCovered = coveredCells.includes(number);

                let backgroundColor = isCovered ? 'bg-blue-500' : ''; // Ajustar color según estado

                return (
                    <div
                        key={index}
                        className={`board-cell ${backgroundColor}`}
                        onDrop={(e) => {
                            e.preventDefault();
                            const tiraLength = e.dataTransfer.getData('tiraLength');
                            handleDrop(number, parseInt(tiraLength));
                        }}
                        onDragOver={(e) => e.preventDefault()} // Evitar comportamiento predeterminado
                    >
                        <span className={isCovered ? 'text-white' : ''}>{number}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default SubtractionBoard;
