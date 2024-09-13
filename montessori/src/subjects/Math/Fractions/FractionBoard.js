import React, { useState, useCallback, useMemo } from 'react';
import FractionPiece from './FractionPiece';
import { useAssistant } from '../../../context/AssistantContext';
import Header from '../../../components/Header';

const FractionBoard = () => {
  const availableFractions = useMemo(() => [1, 1/2, 1/3, 1/4, 1/5, 1/6, 1/7, 1/8, 1/9, 1/10], []);
  const colors = useMemo(() => [
    '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FFB5E8',
    '#F3A683', '#E8C1A0', '#A8D0E6', '#FF92A9', '#A29BFE'
  ], []);

  const [circles, setCircles] = useState(Array(10).fill([]));
  const { showAssistantMessage } = useAssistant();

  const handleDrop = useCallback((e, circleIndex) => {
    const { fraction, color } = JSON.parse(e.dataTransfer.getData('piece'));
    const circle = circles[circleIndex];
    const totalFraction = circle.reduce((sum, piece) => sum + piece.fraction, 0);
    const newTotalFraction = totalFraction + fraction;

    const remainingSpace = 1 - totalFraction;

    if (fraction > remainingSpace + 0.01) {
      showAssistantMessage('Esa pieza es demasiado grande para el espacio restante. Intenta con una pieza más pequeña.', 'error');
      return;
    }

    const updatedCircles = circles.map((c, index) =>
      index === circleIndex ? [...c, { fraction, color }] : c
    );
    setCircles(updatedCircles);

    const newRemainingSpace = 1 - newTotalFraction;

    if (newRemainingSpace < 0.01) {
      showAssistantMessage('¡Has completado el círculo! ¡Bien hecho!', 'success');
    } else {
      const fittingPiece = availableFractions.find(p => Math.abs(p - newRemainingSpace) < 0.01);

      if (fittingPiece && fittingPiece > 0) {
        showAssistantMessage(`Tienes un espacio que puede llenarse con 1/${Math.round(1/fittingPiece)}.`, 'info');
      } else if (newRemainingSpace < 1/10 && newRemainingSpace > 0) {
        setTimeout(() => {
          const completedCircles = circles.map((c, index) =>
            index === circleIndex ? [...updatedCircles[circleIndex], { fraction: newRemainingSpace, color: color }] : c
          );
          setCircles(completedCircles);
          showAssistantMessage('¡Has completado el círculo! ¡Bien hecho!', 'success');
        }, 500);
      }
    }
  }, [circles, setCircles, availableFractions, showAssistantMessage]);

  const resetCircles = () => {
    setCircles(Array(10).fill([]));
    showAssistantMessage('Los círculos han sido reiniciados.', 'info');
  };

  const renderCircleFill = useCallback((pieces) => {
    let accumulatedAngle = 0;

    return pieces.map((piece, index) => {
      const { fraction, color } = piece;

      if (fraction === 1) {
        return <circle key={index} cx="50" cy="50" r="50" fill={color} />;
      }

      const pieceSize = fraction * 360;
      const x1 = 50 + 50 * Math.cos(Math.PI * accumulatedAngle / 180);
      const y1 = 50 + 50 * Math.sin(Math.PI * accumulatedAngle / 180); 
      const x2 = 50 + 50 * Math.cos(Math.PI * (accumulatedAngle + pieceSize) / 180);
      const y2 = 50 + 50 * Math.sin(Math.PI * (accumulatedAngle + pieceSize) / 180); 
      const largeArcFlag = pieceSize > 180 ? 1 : 0;

      accumulatedAngle += pieceSize;

      return (
        <path
          key={index}
          d={`M50,50 L${x1},${y1} A50,50 0 ${largeArcFlag} 1 ${x2},${y2} Z`}
          fill={color}
        />
      );
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-blue-200 via-purple-100 to-green-100 relative px-4 sm:px-6 lg:px-8 pt-12 pb-4 sm:pt-16">
      <Header
        title="Actividad de Fracciones"
        leftButtonText="Volver"
        leftButtonHref="../../../App.js"  
        rightButtonText="Actividades"
        rightButtonHref="../Math"
        primaryColor="from-blue-400 to-purple-500"
        secondaryColor="bg-yellow-400 hover:bg-yellow-300"
      />

      {/* Elementos de fondo ligeros */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-300 bg-opacity-25 rounded-full"></div>
        <div className="absolute bottom-10 right-16 w-28 h-28 bg-purple-300 bg-opacity-25 rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 transform rotate-12 text-blue-300 text-6xl font-bold opacity-20">
          1/2
        </div>
        <div className="absolute bottom-1/4 right-1/3 transform -rotate-6 text-purple-300 text-5xl font-bold opacity-20">
          1/4
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-7xl z-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-3 md:gap-4 xl:gap-6">
          {circles.map((pieces, index) => (
            <div key={index} className="bg-white border border-blue-300 rounded-md flex items-center justify-center p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-auto max-w-[60px] max-h-[60px] sm:max-w-[80px] sm:max-h-[80px] md:max-w-[100px] md:max-h-[100px] lg:max-w-[120px] lg:max-h-[120px] xl:max-w-[140px] xl:max-h-[140px] border-4 border-blue-500 rounded-full overflow-hidden shadow-lg"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, index)}
              >
                {renderCircleFill(pieces)}
              </svg>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-4">
          {availableFractions.map((fraction, i) => (
            <FractionPiece
              key={i}
              fraction={fraction}
              color={colors[i]} 
              label={fraction === 1 ? '1/1' : `1/${Math.round(1/fraction)}`}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  'piece',
                  JSON.stringify({ fraction, color: colors[i] })
                );
                e.target.style.opacity = "0.5";
              }}
              onDragEnd={(e) => {
                e.target.style.opacity = "1";
              }}
            />
          ))}
        </div>

        <button 
          onClick={resetCircles}
          className="mt-2 sm:mt-4 px-4 py-2 bg-blue-500 text-white text-sm sm:text-base font-semibold rounded-lg shadow hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
        >
          Reiniciar Círculos
        </button>
      </div>
    </div>
  );
};

export default FractionBoard;
