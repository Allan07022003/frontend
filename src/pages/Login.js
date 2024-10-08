import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAssistant } from '../context/AssistantContext'; 
import { Box, Button, FormControl, FormLabel, Input, Heading, Text } from '@chakra-ui/react'; 
import Figures from './components/figures'; 
import './components/styles.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showAssistantMessage } = useAssistant(); 
  const navigate = useNavigate();

  // Validación del formato del correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación: Asegurar que los campos no estén vacíos
    if (!email || !password) {
      showAssistantMessage('Por favor completa todos los campos', 'error');
      return;
    }

    // Validación: Comprobar que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      showAssistantMessage('La contraseña debe tener al menos 6 caracteres.', 'error');
      return;
    }

    // Validación: Formato correcto del correo electrónico
    if (!validateEmail(email)) {
      showAssistantMessage('Por favor introduce un correo electrónico válido.', 'error');
      return;
    }

    try {
      const response = await axios.post('https://backend-montessori-c4e81f9ce871.herokuapp.com/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      if (response.data.role === 'student') {
        showAssistantMessage('¡Inicio de sesión como estudiante exitoso!', 'success');
        navigate('/dashboard'); 
      } else if (response.data.role === 'teacher') {
        showAssistantMessage('¡Inicio de sesión como profesor exitoso!', 'success');
        navigate('/adminDashboard');
      }
    } catch (error) {
      showAssistantMessage('Credenciales incorrectas', 'error');
      console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="background-container"> 
      <Figures /> 
      <Box
        maxW={{ base: "90%", md: "lg", lg: "lg" }} 
        mx="auto"
        mt="10"
        p="6"
        borderRadius="lg"
        boxShadow="xl"
        bg="white"
        border="none"
        fontFamily="'Roboto', 'Arial', sans-serif"  
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
          ¡Bienvenido al inicio de sesión <br /> de la Plataforma Montessori!
        </Heading>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <FormControl id="email" mb="4">
            <FormLabel color="#5A67D8" fontWeight="bold">
              Correo Electrónico
            </FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu correo"
              required
              borderColor="#5A67D8"
              _hover={{ borderColor: '#FF4500' }}
              borderWidth="2px"
              borderRadius="md"
              p="2"
              transition="border-color 0.3s, box-shadow 0.3s"
              _focus={{ borderColor: '#FF4500', boxShadow: '0 0 0 3px rgba(255, 99, 71, 0.5)' }}
            />
          </FormControl>

          <FormControl id="password" mb="4">
            <FormLabel color="#5A67D8" fontWeight="bold">
              Contraseña
            </FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
              required
              borderColor="#5A67D8"
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
            transition="background-color 0.3s"
          >
            Iniciar Sesión
          </Button>
          <Text mt="4" zIndex="1">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" style={{ color: '#FF0080', fontWeight: 'bold' }}>
              Regístrate aquí
            </Link>
          </Text>
        </form>
      </Box>
    </div>
  );
};

export default Login;
