import React, { useState, useEffect, useCallback } from 'react';
import SubtractionBoard from './SubtractionBoard';
import Tira from './Tira';
import { useAssistant } from '../../../context/AssistantContext';
import generateSubtractions from './generateSubtractions';
import Header from '../../../components/Header';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend'; 
import { HTML5Backend } from 'react-dnd-html5-backend'; 
import './css/SubtractionBoard.css'; 
import './css/Tira.css'; 

const isMobileDevice = () => {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

const SubtractionActivity = () => {
  const { showAssistantMessage } = useAssistant();
  const [fase, setFase] = useState(1);
  const [coveredCells, setCoveredCells] = useState([]);
  const [minuendo, setMinuendo] = useState(0);
  const [sustraendo, setSustraendo] = useState(0);
  const [resultado, setResultado] = useState(0);
  const [tirasSustraendo, setTirasSustraendo] = useState([]);
  const [tirasResultado, setTirasResultado] = useState([]);
  const [worksheet, setWorksheet] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [difficulty, setDifficulty] = useState(1);

  const generarNuevaResta = useCallback((ejercicio) => {
    setMinuendo(ejercicio.minuendo);
    setSustraendo(ejercicio.sustraendo);
    setResultado(ejercicio.minuendo - ejercicio.sustraendo);
    setFase(1);
    setCoveredCells([]);

    setTirasSustraendo(generateRandomTiras(ejercicio.sustraendo));
    setTirasResultado(generateRandomTiras(ejercicio.minuendo - ejercicio.sustraendo));
  }, []);

  const generarHojaDeTrabajo = useCallback(() => {
    const newWorksheet = [];
    for (let i = 0; i < 10; i++) {
      let minuendo, sustraendo;
      do {
        ({ minuendo, sustraendo } = generateSubtractions(difficulty, newWorksheet)); 
      } while (sustraendo === 0 || minuendo === 0);
      newWorksheet.push({ minuendo, sustraendo, resultado: null });
    }
    setWorksheet(newWorksheet);
    setCurrentExercise(0);
    generarNuevaResta(newWorksheet[0]);
  }, [difficulty, generarNuevaResta]);
  

  const generateRandomTiras = (correctTira, color) => {
    const randomTiras = [];
    let maxTira;
  
    if (difficulty === 1) {
      maxTira = 8;
    } else if (difficulty === 2) { 
      maxTira = 12;
    } else if (difficulty === 3) { 
      maxTira = 20;
    }
  
    while (randomTiras.length < 2) {
      const random = Math.floor(Math.random() * maxTira) + 1;
      if (!randomTiras.includes(random) && random !== correctTira) {
        randomTiras.push(random);
      }
    }
  
    randomTiras.push(correctTira);
    return randomTiras.sort((a, b) => a - b);
  };
  

  useEffect(() => {
    generarHojaDeTrabajo();
  }, [generarHojaDeTrabajo]);

  const handleDrop = (number, length, color) => {
    if (fase === 1 && color === 'bg-blue-500' && length === sustraendo) {
      const newCoveredCells = [...Array(length).keys()].map(i => minuendo - i);
      setCoveredCells(prev => [...prev, ...newCoveredCells]);
  
      showAssistantMessage('Sustraendo (tira azul) colocado correctamente.', 'success');
  
      setFase(2);
    } 
    else if (fase === 2 && color === 'bg-red-500' && length === resultado) {
      const newCoveredCells = [...Array(length).keys()].map(i => resultado - i);
      setCoveredCells(prev => [...prev, ...newCoveredCells]);
  
      showAssistantMessage(`Resultado (tira roja) colocado correctamente. El resultado es ${resultado}`, 'success');
  
      const updatedWorksheet = [...worksheet];
      updatedWorksheet[currentExercise].resultado = resultado;
      setWorksheet(updatedWorksheet);
  
      setTimeout(() => {
        avanzarEjercicio();
      }, 2000);
    } 
    else {
      if (fase === 1 && color === 'bg-red-500') {
        showAssistantMessage('Error: Debes colocar la tira azul (sustraendo) primero.', 'error');
      } else if (fase === 2 && color === 'bg-blue-500') {
        showAssistantMessage('Error: Debes colocar la tira roja (resultado) después de la azul.', 'error');
      }
    }
  };
  

  const avanzarEjercicio = () => {
    if (currentExercise + 1 < worksheet.length) {
      const nextExercise = worksheet[currentExercise + 1];
      setCurrentExercise(currentExercise + 1);
      generarNuevaResta(nextExercise);
    } else {
      showAssistantMessage('¡Hoja de trabajo completada! Aumentando dificultad...', 'success');
      setDifficulty(difficulty + 1);
      generarHojaDeTrabajo();
    }
  };

  return (
    <DndProvider backend={isMobileDevice() ? TouchBackend : HTML5Backend}>
      <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-blue-200 via-purple-100 to-green-100 relative px-4 sm:px-6 lg:px-8 pt-24 sm:pt-26 lg:pt-28 font-sans">
        <Header
          title="Restas"
          leftButtonText="Inicio"
          leftButtonHref="/dashboard"
          rightButtonText="Actividades"
          rightButtonHref="../Math"
          primaryColor="from-blue-600 to-blue-900"
          secondaryColor="bg-yellow-500 hover:bg-yellow-400"
        />

        <div className="flex justify-center space-x-2 sm:space-x-3 lg:space-x-4 my-2 sm:my-3 lg:my-4">
          <button
            onClick={() => setDifficulty(1)}
            className="px-2 py-1 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-600 text-xs sm:text-sm lg:text-base transition-transform transform hover:scale-105"
          >
            Fácil
          </button>
          <button
            onClick={() => setDifficulty(2)}
            className="px-2 py-1 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-500 text-xs sm:text-sm lg:text-base transition-transform transform hover:scale-105"
          >
            Medio
          </button>
          <button
            onClick={() => setDifficulty(3)}
            className="px-2 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-500 text-xs sm:text-sm lg:text-base transition-transform transform hover:scale-105"
          >
            Difícil
          </button>
        </div>

        <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto mb-2 sm:mb-3 lg:mb-4 bg-white rounded-lg shadow p-2 sm:p-3 lg:p-4">
          <h2 className="text-sm sm:text-md lg:text-xl mb-1 font-bold text-center text-purple-700">Hoja de Trabajo</h2>
          <ul className="list-disc text-sm sm:text-base lg:text-lg text-center">
            {worksheet.map((ejercicio, index) => (
              <li key={index} className={`mb-1 ${currentExercise === index ? "font-bold text-blue-700 text-lg" : "text-base"}`}>
                {ejercicio.minuendo} - {ejercicio.sustraendo} =
                <span className="text-green-600 font-bold text-lg">
                  {ejercicio.resultado !== null ? ` ${ejercicio.resultado}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm sm:text-md lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4">
          Resta:
          <span className="text-blue-700 font-bold"> {minuendo}</span> -
          <span className="text-red-600 font-bold"> {sustraendo}</span>
        </p>

        <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto mb-3 sm:mb-4 lg:mb-5">
          <SubtractionBoard 
            handleDrop={handleDrop} 
            coveredCells={coveredCells} 
            fase={fase} 
            minuendo={minuendo}
            className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1"
          />
        </div>

        <div className="w-full max-w-md sm:max-w-xl mx-auto grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 mt-2 sm:mt-3 lg:mt-4">
          <div className="flex flex-col items-center">
            <h3 className="text-xs sm:text-sm lg:text-base mb-1 font-semibold text-blue-600 text-center">Tiras Azules (sustraendo)</h3>
            <div className="tira-container flex flex-col gap-2">
              {tirasSustraendo
                .sort((a, b) => a - b)
                .map((length, index) => (
                  <Tira
                    key={index}
                    length={length}
                    number={length}
                    color="bg-blue-500"
                    className="shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                  />
                ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-xs sm:text-sm lg:text-base mb-1 font-semibold text-red-600 text-center">Tiras Rojas (resultado)</h3>
            <div className="tira-container flex flex-col gap-2">
              {tirasResultado
                .sort((a, b) => a - b)
                .map((length, index) => (
                  <Tira
                    key={index}
                    length={length}
                    number={length}
                    color="bg-red-500"
                    className="shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default SubtractionActivity;
