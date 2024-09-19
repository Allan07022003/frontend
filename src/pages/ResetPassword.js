import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading } from '@chakra-ui/react'; // Importar Chakra components
import { useAssistant } from '../context/AssistantContext'; // Usar el asistente de alertas

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student'); // Rol por defecto como 'student'
  const { showAssistantMessage } = useAssistant(); // Alertas personalizadas
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let apiEndpoint;
      if (role === 'student') {
        // Ruta del estudiante
        apiEndpoint = 'https://backend-montessori-c4e81f9ce871.herokuapp.com/api/students/password-reset';
      } else if (role === 'teacher') {
        // Ruta del profesor
        apiEndpoint = 'https://backend-montessori-c4e81f9ce871.herokuapp.com/api/teachers/password-reset';
      }

      await axios.post(apiEndpoint, { email });

      showAssistantMessage('¡Correo de recuperación enviado con éxito!', 'success');
      navigate('/login'); // Redirigir al login tras el éxito
    } catch (error) {
      showAssistantMessage('Error al enviar el correo de recuperación', 'error');
      console.error(error);
    }
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt="10"
      p="6"
      borderRadius="lg"
      boxShadow="xl"
      bg="white"
      border="none"
      textAlign="center"
      fontFamily="'Comic Sans MS', cursive, sans-serif"
    >
      <Heading mb="6" fontSize="2xl" color="#5A67D8">
        Recuperar Contraseña
      </Heading>

      <form onSubmit={handleSubmit}>
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
            _focus={{ borderColor: '#FF4500', boxShadow: '0 0 0 3px rgba(255, 99, 71, 0.5)' }}
          />
        </FormControl>

        <FormControl id="role" mb="6">
          <FormLabel color="#5A67D8" fontWeight="bold">
            Rol
          </FormLabel>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              borderColor: '#5A67D8',
              borderWidth: '2px',
            }}
          >
            <option value="student">Estudiante</option>
            <option value="teacher">Profesor</option>
          </select>
        </FormControl>

        <Button
          type="submit"
          bgGradient="linear(to-r, #7928CA, #FF0080)"
          color="white"
          _hover={{ bgGradient: 'linear(to-r, #FF7F50, #FF4500)' }}
          width="full"
        >
          Recuperar Contraseña
        </Button>
      </form>
    </Box>
  );
};

export default ResetPassword;
