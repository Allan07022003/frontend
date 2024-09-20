import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CompleteProfileModal from './CompleteProfileModal';
import CharacterAssistant from '../context/CharacterAssistant';

const Dashboard = () => {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [childName, setChildName] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const checkProfileStatus = async () => {
    try {
      const response = await axios.get('https://backend-montessori-c4e81f9ce871.herokuapp.com/api/students/profile-status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.isComplete) {
        setIsProfileComplete(true);
        const firstNameOnly = response.data.firstName.split(' ')[0];
        setChildName(firstNameOnly);
        localStorage.setItem('profileComplete', 'true'); // Guardar el estado del perfil en localStorage
        localStorage.setItem('childName', firstNameOnly); // Guardar el nombre del niño en localStorage
      } else {
        setIsProfileComplete(false);
        localStorage.removeItem('profileComplete'); // Remover el estado si no está completo
        localStorage.removeItem('childName'); // Remover el nombre si no está completo
      }
    } catch (error) {
      console.error('Error al verificar el estado del perfil:', error);
    }
    setIsLoading(false); // Finaliza la carga
  };

  useEffect(() => {
    const profileComplete = localStorage.getItem('profileComplete');
    const storedName = localStorage.getItem('childName');
    
    if (profileComplete === 'true' && storedName) {
      setIsProfileComplete(true);
      setChildName(storedName);
      setIsLoading(false); // Si ya está en localStorage, no es necesario verificar la API
    } else {
      checkProfileStatus(); // Verificar desde la API si no está en localStorage
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profileComplete');
    localStorage.removeItem('childName');
    navigate('/login');
  };

  const handleCompleteProfileClick = () => {
    if (!isProfileComplete) {
      setIsModalOpen(true);
    }
  };

  const handleProfileComplete = async () => {
    await checkProfileStatus();
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100">
        <Text fontSize="xl" fontWeight="bold" color="purple.600">Cargando...</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden pt-20 md:pt-32">
      {/* Fondo dinámico con figuras geométricas */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 opacity-90 z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-400 rounded-full opacity-20 animate-slow-move" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-400 rounded-full opacity-30 animate-slow-move-2" />
        <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-yellow-400 rounded-full opacity-20 animate-slow-pulse" />
      </div>

      <Header
        title="Dashboard Montessori"
        leftButtonText="Cerrar Sesión"
        leftButtonHref="/home"
        rightButtonText={isProfileComplete ? childName : 'Completar Perfil'}
        onLogout={handleLogout}
        onCompleteProfileClick={handleCompleteProfileClick}
        rightButtonHref={isProfileComplete ? null : undefined}
      />

      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
        {/* Si el perfil no está completo, mostrar el asistente */}
        {!isProfileComplete ? (
          <div className="flex flex-col items-center justify-center mt-10 md:mt-20 w-full max-w-md sm:max-w-xs">
            <CharacterAssistant
              message="¡Hola! Aún no has completado tu perfil. Haz clic para comenzar."
              onButtonClick={handleCompleteProfileClick}
              imageStyles="w-full max-w-xs md:max-w-sm"
            />
          </div>
        ) : (
          <>
            {/* Título principal ajustado para móviles */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-300 mb-8 sm:mb-12 text-center px-2 leading-tight sm:leading-normal animate-slide-in">
              ¡Hola, {childName}! <br /> Elige qué materia quieres practicar
            </h1>

            <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} className="w-full max-w-6xl px-4">
              <Box onClick={() => navigate('/math')} bgGradient="linear(to-r, blue.200, blue.500)" p={6} borderRadius="xl" boxShadow="lg" className="hover:scale-105 transition-transform cursor-pointer">
                <Text textAlign="center" fontWeight="bold" fontSize={{ base: 'lg', sm: 'xl' }} className="text-white">Matemáticas</Text>
                <Text textAlign="center" fontSize={{ base: 'sm', sm: 'md' }} className="text-white opacity-80">¡Resuelve acertijos y juega con números!</Text>
              </Box>

              <Box onClick={() => navigate('/language')} bgGradient="linear(to-r, green.200, green.500)" p={6} borderRadius="xl" boxShadow="lg" className="hover:scale-105 transition-transform cursor-pointer">
                <Text textAlign="center" fontWeight="bold" fontSize={{ base: 'lg', sm: 'xl' }} className="text-white">Lenguaje</Text>
                <Text textAlign="center" fontSize={{ base: 'sm', sm: 'md' }} className="text-white opacity-80">¡Aprende a leer y escribir!</Text>
              </Box>

              <Box onClick={() => navigate('/art')} bgGradient="linear(to-r, yellow.200, yellow.500)" p={6} borderRadius="xl" boxShadow="lg" className="hover:scale-105 transition-transform cursor-pointer">
                <Text textAlign="center" fontWeight="bold" fontSize={{ base: 'lg', sm: 'xl' }} className="text-white">Arte</Text>
                <Text textAlign="center" fontSize={{ base: 'sm', sm: 'md' }} className="text-white opacity-80">¡Libera tu creatividad!</Text>
              </Box>

              <Box onClick={() => navigate('/science')} bgGradient="linear(to-r, orange.200, orange.500)" p={6} borderRadius="xl" boxShadow="lg" className="hover:scale-105 transition-transform cursor-pointer">
                <Text textAlign="center" fontWeight="bold" fontSize={{ base: 'lg', sm: 'xl' }} className="text-white">Ciencias</Text>
                <Text textAlign="center" fontSize={{ base: 'sm', sm: 'md' }} className="text-white opacity-80">¡Explora el mundo que te rodea!</Text>
              </Box>
            </Grid>
          </>
        )}
      </div>

      {/* Modal de completar perfil */}
      <CompleteProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProfileComplete={handleProfileComplete}
      />
    </div>
  );
};

export default Dashboard;