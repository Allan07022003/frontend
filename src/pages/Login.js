import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAssistant } from '../context/AssistantContext'; // Importar alertas
import { Box, Button, FormControl, FormLabel, Input, Heading, Text } from '@chakra-ui/react'; // Importar Chakra components
import Figures from './components/figures'; // Importamos las figuras
import './components/styles.css';  // Reutilizamos las figuras geométricas

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showAssistantMessage } = useAssistant(); // Usar las alertas personalizadas
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showAssistantMessage('Por favor completa todos los campos', 'error');
      return;
    }

    try {
      const response = await axios.post('https://backend-montessori-c4e81f9ce871.herokuapp.com/api/auth/login', {
        email,
        password,
      });

      // Almacenar el token y el rol en el localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      if (response.data.role === 'student') {
        showAssistantMessage('¡Inicio de sesión como estudiante exitoso!', 'success');
        navigate('/dashboard'); // Redirigir al dashboard del alumno
      } else if (response.data.role === 'teacher') {
        showAssistantMessage('¡Inicio de sesión como profesor exitoso!', 'success');
        navigate('/adminDashboard'); // Redirigir al panel de administración
      }
    } catch (error) {
      showAssistantMessage('Credenciales incorrectas', 'error');
      console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="background-container"> {/* Reutilizamos el fondo */}
      <Figures /> {/* Reutilizamos las figuras geométricas */}
      <Box
        maxW={{ base: "90%", md: "lg", lg: "lg" }} // Ajuste de tamaño responsive
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
