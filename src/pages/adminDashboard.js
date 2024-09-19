import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    navigate('/login'); // Redirige a la página de inicio de sesión
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
      <Heading mb="4" fontSize="2xl" color="#5A67D8">
        Panel de Administración
      </Heading>
      <Text mb="4" color="#4A5568">
        ¡Bienvenido al panel de administración! Aquí puedes gestionar la información de los estudiantes y profesores.
      </Text>
      
      <Button
        onClick={handleLogout}
        bgGradient="linear(to-r, #FF0080, #7928CA)"
        color="white"
        _hover={{ bgGradient: 'linear(to-r, #FF7F50, #FF4500)' }}
        mt="4"
      >
        Cerrar Sesión
      </Button>
    </Box>
  );
};

export default AdminDashboard;
