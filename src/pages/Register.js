import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, Spinner } from '@chakra-ui/react';
import { useAssistant } from '../context/AssistantContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importamos framer-motion para las animaciones
import Figures from './components/figures';
import './components/styles.css';

// Definir animaciones de entrada y salida
const pageTransition = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
};

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState({ email: false, password: false });
    const { showAssistantMessage } = useAssistant();
    const navigate = useNavigate();

    const handleFocus = (field) => {
      setIsFocused({ ...isFocused, [field]: true });
    };

    const handleBlur = (field) => {
      setIsFocused({ ...isFocused, [field]: false });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const res = await axios.post('https://backend-montessori-c4e81f9ce871.herokuapp.com/api/students/register', {
          email,
          password,
        });
        showAssistantMessage('¡Usuario registrado con éxito!', 'success');

        // Pausa antes de la redirección para la transición
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error al registrar el usuario';
        showAssistantMessage(errorMessage, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      // Envolver todo el formulario en un componente de motion para animaciones de entrada y salida
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <Box
          maxW={{ base: "90%", md: "lg", lg: "lg" }}
          mx="auto"
          mt="10"
          p="6"
          borderRadius="lg"
          boxShadow="xl"
          bg="white"
          border="none"
          fontFamily="'Comic Sans MS', cursive, sans-serif"
          textAlign="center"
          position="relative"
          zIndex="1"
          overflow="hidden"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading mb="4" fontSize="2xl" color="#5A67D8" zIndex="1">
            ¡Bienvenido al registro de <br /> la Plataforma Montessori!
          </Heading>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FormControl id="email" mb="4">
              <FormLabel
                color={isFocused.email ? '#FF7F50' : '#5A67D8'}
                fontWeight="bold"
                transition="color 0.3s"
              >
                Correo Electrónico
              </FormLabel>
              <Input
                type="email"
                value={email}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Introduce tu correo"
                required
                borderColor={isFocused.email ? '#FF7F50' : '#5A67D8'}
                _hover={{ borderColor: '#FF4500' }}
                borderWidth="2px"
                borderRadius="md"
                p="2"
                transition="border-color 0.3s, box-shadow 0.3s"
                _focus={{ borderColor: '#FF4500', boxShadow: '0 0 0 3px rgba(255, 99, 71, 0.5)' }}
              />
            </FormControl>

            <FormControl id="password" mb="4">
              <FormLabel
                color={isFocused.password ? '#FF7F50' : '#5A67D8'}
                fontWeight="bold"
                transition="color 0.3s"
              >
                Contraseña
              </FormLabel>
              <Input
                type="password"
                value={password}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduce tu contraseña"
                required
                borderColor={isFocused.password ? '#FF7F50' : '#5A67D8'}
                _hover={{ borderColor: '#FF4500' }}
                borderWidth="2px"
                borderRadius="md"
                p="2"
                transition="border-color 0.3s, box-shadow 0.3s"
                _focus={{ borderColor: '#FF4500', boxShadow: '0 0 0 3px rgba(255, 99, 71, 0.5)' }}
              />
            </FormControl>

            <Button
              type="submit"
              bgGradient="linear(to-r, #7928CA, #FF0080)"
              color="white"
              _hover={{ bgGradient: 'linear(to-r, #FF7F50, #FF4500)' }}
              width="full"
              mt="4"
              isDisabled={isLoading}
              transition="background-color 0.3s"
            >
              {isLoading ? <Spinner size="sm" /> : 'Registrarse'}
            </Button>
          </form>

          <Text mt="4" zIndex="1">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" style={{ color: '#FF0080', fontWeight: 'bold' }}>
              Inicia sesión aquí
            </Link>
          </Text>
        </Box>
      </motion.div>
    );
  };

  const BackgroundContainer = () => (
    <div className="background-container">
      <Figures />
      <Register />
    </div>
  );

  export default BackgroundContainer;
