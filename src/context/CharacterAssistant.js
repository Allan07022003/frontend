import React from 'react';
import { Box, Image, Text, Button, keyframes } from '@chakra-ui/react'; 

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
`;

const CharacterAssistant = ({ message, onButtonClick }) => {
  return (
    <Box
      className="character-assistant"
      textAlign="center"
      position="relative"
      p={4}
      maxW={{ base: '90%', sm: '80%', md: '300px', lg: '350px' }} 
      m="auto"
      mt={8}
      boxShadow="lg"
      borderRadius="lg"
      bgGradient="linear(to-r, teal.400, blue.400)"
    >
      {/* Imagen del personaje */}
      <Image
        src="https://res.cloudinary.com/drl8mphdx/image/upload/v1726767878/asistente-Photoroom_uvsvgy.png" 
        alt="Asistente"
        boxSize={{ base: '150px', sm: '200px', md: '250px', lg: '300px' }} 
        m="auto"
        mb={4}
        animation={`${bounce} 2s infinite`} 
      />

      <Text fontSize={{ base: 'md', sm: 'lg', md: 'xl' }} fontWeight="bold" mb={4} color="white">
        {message || '¡Hola! Estoy aquí para ayudarte.'}
      </Text>

      <Button
        colorScheme="yellow"
        size={{ base: 'sm', sm: 'md', md: 'lg' }} 
        onClick={onButtonClick}
        boxShadow="xl"
        _hover={{ transform: 'scale(1.05)', bg: 'yellow.300' }}
        _active={{ transform: 'scale(0.95)' }}
      >
        Completar Perfil
      </Button>
    </Box>
  );
};

export default CharacterAssistant;
