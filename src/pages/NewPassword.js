import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAssistant } from '../context/AssistantContext'; // Para notificaciones
import { Box, Button, FormControl, FormLabel, Input, Heading, Text } from '@chakra-ui/react';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showAssistantMessage } = useAssistant();
  const { token } = useParams();  // El token será parte de la URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      showAssistantMessage('Por favor completa todos los campos', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showAssistantMessage('Las contraseñas no coinciden', 'error');
      return;
    }

    try {
      await axios.post(`https://backend-montessori-c4e81f9ce871.herokuapp.com/api/auth/reset-password/${token}`, {
        password,
      });
      showAssistantMessage('Contraseña restablecida correctamente', 'success');
      navigate('/login'); // Redirige al login después de restablecer la contraseña
    } catch (error) {
      showAssistantMessage('Error al restablecer la contraseña', 'error');
      console.error('Error:', error);
    }
  };

  return (
    <Box
      maxW={{ base: "90%", md: "lg", lg: "lg" }} 
      mx="auto"
      mt="10"
      p="6"
      borderRadius="lg"
      boxShadow="xl"
      bg="white"
      border="none"
      textAlign="center"
    >
      <Heading mb="6" fontSize="2xl" color="#5A67D8">
        Restablecer Contraseña
      </Heading>

      <form onSubmit={handleSubmit}>
        <FormControl id="password" mb="4">
          <FormLabel>Nueva Contraseña</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce tu nueva contraseña"
            required
          />
        </FormControl>

        <FormControl id="confirmPassword" mb="4">
          <FormLabel>Confirmar Contraseña</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirma tu nueva contraseña"
            required
          />
        </FormControl>

        <Button
          type="submit"
          bgGradient="linear(to-r, #7928CA, #FF0080)"
          color="white"
          width="full"
          mt="4"
        >
          Restablecer Contraseña
        </Button>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
