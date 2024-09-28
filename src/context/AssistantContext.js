// src/context/AssistantContext.js
import React, { createContext, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import successAnimation from './animations/succes.json';
import errorAnimation from './animations/error.json';
import infoAnimation from './animations/info.json';

const AssistantContext = createContext();

export const useAssistant = () => useContext(AssistantContext);

const animations = {
  success: successAnimation,
  error: errorAnimation,
  info: infoAnimation,
};

const CharacterWrapper = styled(motion.div)`
  width: 60px;
  height: 60px;

  @media (min-width: 768px) {
    width: 80px;
    height: 80px;
  }

  @media (min-width: 1024px) {
    width: 100px;
    height: 100px;
  }
`;

const Character = ({ animation }) => {
  return (
    <CharacterWrapper
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Lottie 
        animationData={animation} 
        loop={false} 
        style={{ width: '100%', height: '100%' }} 
      />
    </CharacterWrapper>
  );
};

export const AssistantProvider = ({ children }) => {
  const showAssistantMessage = (message, type) => {
    const animation = animations[type] || infoAnimation;

    toast.dismiss(); // Descartar cualquier toast anterior antes de mostrar uno nuevo

    toast(
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Character animation={animation} />
        <p className="text-white text-sm sm:text-base font-semibold">{message}</p>
      </div>,
      {
        style: {
          background: '#1e293b',
          color: '#fff',
          padding: '8px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          pointerEvents: 'none',
          margin: 'auto',
          maxWidth: '90%',
        },
        icon: null,
        position: 'top-center',
        duration: 5000, 
      }
    );
  };

  return (
    <AssistantContext.Provider value={{ showAssistantMessage }}>
      {children}
    </AssistantContext.Provider>
  );
};
