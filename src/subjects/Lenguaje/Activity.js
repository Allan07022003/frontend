import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropZone from "./components/DropZone";
import AnimatedIcon from "./components/AnimatedIcon";
import Navigation from "./components/Navigation";
import animationsData from "../../utils/animationsData";
import { useAssistant } from "../../context/AssistantContext";
import { speak } from "../../utils/voiceService";
import LetterBox from "./components/LetterBox";
import Header from "../../components/Header";

const Activity = () => {
  // Guardar la dificultad en localStorage y obtenerla si existe
  const [difficulty, setDifficulty] = useState(
    () => localStorage.getItem("difficulty") || "easy"
  );
  const [currentIndex, setCurrentIndex] = useState(
    () => JSON.parse(localStorage.getItem("currentIndex")) || 0
  );
  const [completedWords, setCompletedWords] = useState(
    () => JSON.parse(localStorage.getItem("completedWords")) || {}
  );
  const [enteredLetters, setEnteredLetters] = useState(
    () =>
      JSON.parse(localStorage.getItem("enteredLetters"))?.[currentIndex] ||
      Array(animationsData[difficulty][currentIndex].word.length).fill(null)
  );
  const [attempts, setAttempts] = useState(0);
  const [animationUrl, setAnimationUrl] = useState(() => {
    const storedAnimations =
      JSON.parse(localStorage.getItem("animationUrls")) || {};
    return (
      storedAnimations[currentIndex] ||
      animationsData[difficulty][currentIndex].animationUrl
    );
  });

  const { showAssistantMessage } = useAssistant();
  const currentAnimation = animationsData[difficulty][currentIndex];

  // Guardar en localStorage el estado de la dificultad, letras y animación
  useEffect(() => {
    localStorage.setItem("difficulty", difficulty); // Guardar la dificultad seleccionada
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));

    const storedLetters =
      JSON.parse(localStorage.getItem("enteredLetters")) || {};
    storedLetters[currentIndex] = enteredLetters;
    localStorage.setItem("enteredLetters", JSON.stringify(storedLetters));

    // Guardar la URL de la animación en localStorage
    const storedAnimations =
      JSON.parse(localStorage.getItem("animationUrls")) || {};
    storedAnimations[currentIndex] = currentAnimation.animationUrl;
    localStorage.setItem("animationUrls", JSON.stringify(storedAnimations));

    // Actualizar la URL de la animación
    setAnimationUrl(currentAnimation.animationUrl);
  }, [currentIndex, enteredLetters, currentAnimation.animationUrl, difficulty]);

  // Limpiar el estado de intentos cuando se cambie de palabra
  useEffect(() => {
    setAttempts(0);
  }, [currentIndex]);

  // Actualizar los slots de letras al cambiar la dificultad o la palabra actual
  useEffect(() => {
    setEnteredLetters(
      Array(animationsData[difficulty][currentIndex].word.length).fill(null)
    );
    setAnimationUrl(animationsData[difficulty][currentIndex].animationUrl);
  }, [difficulty, currentIndex]);

  // Función para manejar cuando el niño complete la palabra
  const handleWordComplete = (isCorrect) => {
    if (isCorrect) {
      showAssistantMessage(
        "¡Correcto! Has formado la palabra correctamente.",
        "success"
      );
      speak(currentAnimation.word);

      // Marcar la palabra como completada pero mantener las letras
      setCompletedWords({
        ...completedWords,
        [currentIndex]: true,
      });

      // Guardar las palabras completadas en localStorage
      const storedWords =
        JSON.parse(localStorage.getItem("completedWords")) || {};
      storedWords[currentIndex] = true;
      localStorage.setItem("completedWords", JSON.stringify(storedWords));

      // Esperar 5 segundos antes de pasar a la siguiente palabra
      setTimeout(() => {
        handleNext(); // Llamar a la función para avanzar a la siguiente palabra
      }, 5000);
    } else {
      showAssistantMessage("Palabra incorrecta. Intenta de nuevo.", "error");
    }
  };

  // Función para avanzar a la siguiente palabra
  const handleNext = () => {
    if (currentIndex < animationsData[difficulty].length - 1) {
      // Guardar el progreso antes de avanzar
      const storedLetters =
        JSON.parse(localStorage.getItem("enteredLetters")) || {};
      storedLetters[currentIndex] = enteredLetters;
      localStorage.setItem("enteredLetters", JSON.stringify(storedLetters));

      setCurrentIndex(currentIndex + 1);
      setEnteredLetters(
        Array(animationsData[difficulty][currentIndex + 1].word.length).fill(
          null
        )
      );
      setAnimationUrl(
        animationsData[difficulty][currentIndex + 1].animationUrl
      );
    }
  };

  // Función para regresar a la palabra anterior
  const handlePrevious = () => {
    if (currentIndex > 0) {
      // Guardar el progreso antes de regresar
      const storedLetters =
        JSON.parse(localStorage.getItem("enteredLetters")) || {};
      storedLetters[currentIndex] = enteredLetters;
      localStorage.setItem("enteredLetters", JSON.stringify(storedLetters));

      setCurrentIndex(currentIndex - 1);
      setEnteredLetters(
        Array(animationsData[difficulty][currentIndex - 1].word.length).fill(
          null
        )
      );
      setAnimationUrl(
        animationsData[difficulty][currentIndex - 1].animationUrl
      );
    }
  };

  // Función para borrar las letras en el DropZone
  const handleClearLetters = () => {
    setEnteredLetters(Array(currentAnimation.word.length).fill(null));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 flex flex-col items-center justify-start py-4 relative">
        {/* Fondo decorativo */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/drl8mphdx/image/upload/v1727381497/DALL_E_2024-09-26_14.11.01_-_A_playful_and_educational_Montessori-themed_background_for_a_children_s_language_learning_activity._The_background_should_feature_children_interacting_c4zxva.webp')",
            opacity: 0.2,
            filter: "brightness(1) contrast(1)",
          }}
        ></div>

        {/* Header */}
        <Header
          title="Lenguaje"
          leftButtonText="Volver"
          leftButtonHref="../dashboard"
          primaryColor="from-pink-500 to-red-500"
          secondaryColor="bg-yellow-400 hover:bg-yellow-300"
          className="z-10"
        />

        {/* Contenedor principal dinámico */}
        <div className="flex flex-col items-center justify-start mt-12 sm:mt-16 lg:mt-24 xl:mt-32 relative z-10 bg-white bg-opacity-90 rounded-lg p-2 sm:p-4 shadow-lg w-full max-w-xs sm:max-w-md lg:max-w-2xl xl:max-w-4xl mx-auto min-h-[60vh] space-y-4 sm:space-y-6 transform scale-80 sm:scale-100">
          {/* Selector de dificultad */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 w-full text-xs sm:text-lg">
            <label
              htmlFor="difficulty"
              className="text-xs sm:text-lg font-semibold text-gray-800"
            >
              Dificultad:
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => {
                setDifficulty(e.target.value);
                setCurrentIndex(0); // Reiniciar a la primera palabra
              }}
              className="ml-2 sm:ml-4 border-2 p-1 sm:p-2 rounded-lg bg-white shadow-md text-xs sm:text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="easy">Fácil</option>
              <option value="medium">Medio</option>
              <option value="hard">Difícil</option>
            </select>
          </div>

          {/* Animación compacta */}
          <div className="flex justify-center items-center w-full max-h-12 sm:max-h-32 lg:max-h-48 mb-3">
            <AnimatedIcon animationUrl={animationUrl} />
          </div>

          {/* DropZone más compacto */}
          <div className="w-full flex justify-center mt-1 sm:mt-2">
            <DropZone
              targetWord={currentAnimation.word}
              enteredLetters={enteredLetters}
              setEnteredLetters={setEnteredLetters}
              onWordComplete={handleWordComplete}
              attempts={attempts}
              setAttempts={setAttempts}
            />
          </div>

          {/* Botón para borrar letras */}
          <button
            onClick={handleClearLetters}
            className="px-1 py-1 sm:px-4 sm:py-2 bg-red-500 text-white font-bold text-xs sm:text-lg rounded-full shadow-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Borrar letras
          </button>

          {/* Contenedor de letras (LetterBox) */}
          <div className="w-full max-w-full lg:max-w-4xl">
            <LetterBox />
          </div>

          {/* Botones de navegación */}
          <div className="flex space-x-1 sm:space-x-4 text-xs sm:text-lg">
            <Navigation
              currentIndex={currentIndex}
              total={animationsData[difficulty].length}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Activity;
