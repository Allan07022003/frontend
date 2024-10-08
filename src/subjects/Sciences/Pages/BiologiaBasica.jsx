import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useAssistant } from "../../../context/AssistantContext";
import { Player } from "@lottiefiles/react-lottie-player";
import animationsData from "../../../utils/dataBank"; 

const BiologiaBasica = () => {
  const { showAssistantMessage } = useAssistant();
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); 

  const currentImage = animationsData[currentIndex]; 

  useEffect(() => {
    showAssistantMessage(
      `¿La siguiente imagen representa a un ser vivo o no vivo?`,
      "info"
    );

    const timer = setTimeout(() => {
      showAssistantMessage(null); 
    }, 12000);

    return () => clearTimeout(timer);
  }, [currentIndex, showAssistantMessage]);

  const handleSelection = (selection) => {
    const esVivo = currentImage.isVivo;
    const seleccionCorrecta =
      (selection === "Vivo" && esVivo) || (selection === "No Vivo" && !esVivo);

    setIsButtonDisabled(true); 

    if (seleccionCorrecta) {
      showAssistantMessage(
        `¡Correcto! La imagen de ${currentImage.word} es un ${
          selection === "Vivo" ? "ser vivo" : "ser no vivo"
        }.`,
        "success"
      );
      setTimeout(() => {
        if (currentIndex < animationsData.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setAttempts(0); 
          setIsLoading(true); 
          setIsButtonDisabled(false); 
        } else {
          showAssistantMessage("¡Has completado la actividad!", "info");
        }
      }, 1500);
    } else {
      showAssistantMessage(
        `Incorrecto. La imagen de ${currentImage.word} no es un ${
          selection === "Vivo" ? "ser vivo" : "ser no vivo"
        }.`,
        "error"
      );
      setAttempts(attempts + 1); 
      setIsButtonDisabled(false); 
    }
  };

  const handleAnimationLoaded = () => {
    setIsLoading(false); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-4 bg-gradient-to-r from-green-200 to-blue-200">
      <Header
        title="Actividad de Fracciones"
        leftButtonText="Volver"
        leftButtonHref="../dashboard "  
        rightButtonText="Actividades"
        rightButtonHref="/sciences"
        primaryColor="from-blue-400 to-purple-500"
        secondaryColor="bg-yellow-400 hover:bg-yellow-300"
      />


      <div className="flex flex-col items-center justify-center mt-10 w-full md:w-3/4 lg:w-1/2">
        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}

        <div className={`w-full sm:w-40 md:w-56 lg:w-72 bg-white shadow-lg rounded-md mb-4 ${isLoading ? 'hidden' : ''}`}>
          <Player
            autoplay
            loop
            key={currentImage.word} 
            src={currentImage.animationUrl}
            onEvent={(event) => {
              if (event === "load") handleAnimationLoaded(); 
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => handleSelection("Vivo")}
            className={`bg-green-500 text-white px-8 py-2 rounded-full shadow-md hover:bg-green-600 transition transform hover:scale-105 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isButtonDisabled} 
          >
            Vivo
          </button>
          <button
            onClick={() => handleSelection("No Vivo")}
            className={`bg-red-500 text-white px-8 py-2 rounded-full shadow-md hover:bg-red-600 transition transform hover:scale-105 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isButtonDisabled}
          >
            No Vivo
          </button>
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
                setIsLoading(true); 
                setIsButtonDisabled(false); 
              }
            }}
            className="bg-gray-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-600 transition transform hover:scale-105"
          >
            Anterior
          </button>

          <button
            onClick={() => {
              if (currentIndex < animationsData.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setIsLoading(true); 
                setIsButtonDisabled(false); 
              }
            }}
            className="bg-gray-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-600 transition transform hover:scale-105"
          >
            Siguiente
          </button>
        </div>
      </div>

      <p className="mt-4 text-gray-700">Intentos: {attempts}</p>
    </div>
  );
};

export default BiologiaBasica;
