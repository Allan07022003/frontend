import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CompleteProfileModal from "./CompleteProfileModal";
import CharacterAssistant from "../context/CharacterAssistant";

const Dashboard = () => {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [childName, setChildName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const checkProfileStatus = async () => {
    try {
      const response = await axios.get(
        "https://backend-montessori-c4e81f9ce871.herokuapp.com/api/students/profile-status",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.isComplete) {
        setIsProfileComplete(true);
        const firstNameOnly = response.data.firstName.split(" ")[0];
        setChildName(firstNameOnly);
        localStorage.setItem("profileComplete", "true");
        localStorage.setItem("childName", firstNameOnly);
      } else {
        setIsProfileComplete(false);
        localStorage.removeItem("profileComplete");
        localStorage.removeItem("childName");
      }
    } catch (error) {
      console.error("Error al verificar el estado del perfil:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const profileComplete = localStorage.getItem("profileComplete");
    const storedName = localStorage.getItem("childName");

    if (profileComplete === "true" && storedName) {
      setIsProfileComplete(true);
      setChildName(storedName);
      setIsLoading(false);
    } else {
      checkProfileStatus();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileComplete");
    localStorage.removeItem("childName");
    navigate("/login");
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
        <Text fontSize="xl" fontWeight="bold" color="purple.600">
          Cargando...
        </Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden pt-20 md:pt-32">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 opacity-90 z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-400 rounded-full opacity-20 animate-slow-move" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-400 rounded-full opacity-30 animate-slow-move-2" />
        <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-yellow-400 rounded-full opacity-20 animate-slow-pulse" />
      </div>

      <Header
        title="Bienvenido a Montessori"
        leftButtonText="Cerrar Sesión"
        leftButtonHref="/home"
        rightButtonText={isProfileComplete ? childName : "Completar Perfil"}
        onLogout={handleLogout}
        onCompleteProfileClick={handleCompleteProfileClick}
        rightButtonHref={isProfileComplete ? null : undefined}
      />

      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-300 mb-8 sm:mb-12 text-center px-2 leading-tight sm:leading-normal animate-slide-in">
              ¡Hola, {childName}! <br /> Elige qué materia quieres practicar con
              Montessori
            </h1>

            <Grid 
              templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} 
              gap={4}  
              className="w-full max-w-6xl px-4"
              justifyContent="center"
              alignItems="center"
            >
              <Box 
                onClick={() => navigate('/math')} 
                bgGradient="linear(to-r, blue.200, blue.500)" 
                p={4}  
                borderRadius="xl"  
                height={{ base: "140px", sm: "160px", lg: "180px" }}  
                boxShadow="md"
                className="hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer transform"
                style={{ 
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease, background-color 0.3s ease",
                  filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))"
                }}
                _hover={{ bgGradient: "linear(to-r, blue.400, blue.700)" }} 
              >
                <Text 
                  textAlign="center" 
                  fontWeight="bold"
                  fontSize={{ base: 'lg', sm: 'xl', lg: '2xl' }}  
                  color="white"
                >
                  Matemáticas
                </Text>
                <Text 
                  textAlign="center" 
                  fontSize={{ base: 'sm', sm: 'md', lg: 'lg' }}  
                  color="white"
                  opacity={0.8}
                >
                  ¡Aprende a Restar con tiras y Fracciones con Montessori!
                </Text>
              </Box>

              <Box 
                onClick={() => navigate('/language')} 
                bgGradient="linear(to-r, green.200, green.500)" 
                p={4} 
                borderRadius="xl" 
                height={{ base: "140px", sm: "160px", lg: "180px" }}  
                boxShadow="md"
                className="hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer transform"
                style={{ 
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease, background-color 0.3s ease",
                  filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))"
                }}
                _hover={{ bgGradient: "linear(to-r, green.400, green.700)" }} 
              >
                <Text 
                  textAlign="center" 
                  fontWeight="bold"
                  fontSize={{ base: 'lg', sm: 'xl', lg: '2xl' }}  
                  color="white"
                >
                  Lenguaje
                </Text>
                <Text 
                  textAlign="center" 
                  fontSize={{ base: 'sm', sm: 'md', lg: 'lg' }} 
                  color="white"
                  opacity={0.8}
                >
                  ¡Aprende a leer y a Formar palabras de una forma Divertida!
                </Text>
              </Box>

              <Box 
                onClick={() => navigate('/sciences')} 
                bgGradient="linear(to-r, orange.200, orange.500)" 
                p={4} 
                borderRadius="xl"  
                height={{ base: "140px", sm: "160px", lg: "180px" }}  
                boxShadow="md"
                className="hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer transform"
                style={{ 
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease, background-color 0.3s ease",
                  filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))"
                }}
                _hover={{ bgGradient: "linear(to-r, orange.400, orange.700)" }} 
              >
                <Text 
                  textAlign="center" 
                  fontWeight="bold"
                  fontSize={{ base: 'lg', sm: 'xl', lg: '2xl' }}  
                  color="white"
                >
                  Ciencias
                </Text>
                <Text 
                  textAlign="center" 
                  fontSize={{ base: 'sm', sm: 'md', lg: 'lg' }} 
                  color="white"
                  opacity={0.8}
                >
                  ¡Explora y conoce los seres vivos y Aprende acerca del cuerpo humano!
                </Text>
              </Box>
            </Grid>

          </>
        )}
      </div>

      <CompleteProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProfileComplete={handleProfileComplete}
      />
    </div>
  );
};

export default Dashboard;
