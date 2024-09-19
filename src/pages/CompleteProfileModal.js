import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useAssistant } from '../context/AssistantContext';

const CompleteProfileModal = ({ isOpen, onClose, onProfileComplete }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const { showAssistantMessage } = useAssistant();
  const toast = useToast();
  const token = localStorage.getItem('token');

  // Validación básica para evitar inyección SQL
  const validateInput = (input) => {
    const sqlInjectionRegex = /['";\-]/;
    return !sqlInjectionRegex.test(input);
  };

  // Verificación inicial solo si el modal está abierto
  useEffect(() => {
    const checkProfileCompletion = async () => {
      try {
        const response = await axios.get(
          'https://backend-montessori-c4e81f9ce871.herokuapp.com/api/students/profile-status',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Solo mostrar el asistente si el perfil no está completo
        if (!response.data.isComplete) {
          showAssistantMessage('Por favor completa tu perfil para continuar', 'info');
        }
      } catch (error) {
        console.error('Error al verificar el perfil:', error);
      }
    };

    if (isOpen) {
      checkProfileCompletion();
    }
  }, [token, isOpen, showAssistantMessage]);

  // Manejar el submit del perfil
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !age ||
      !grade ||
      !validateInput(firstName) ||
      !validateInput(lastName) ||
      !validateInput(age) ||
      !validateInput(grade)
    ) {
      toast({
        title: 'Error',
        description: 'Por favor completa todos los campos correctamente.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.put(
        'https://backend-montessori-c4e81f9ce871.herokuapp.com/api/students/complete-profile',
        { firstName, lastName, age, grade },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showAssistantMessage('Perfil completado con éxito', 'success');
      onProfileComplete(); // Actualiza el estado del perfil en el Dashboard
      onClose(); // Cierra el modal
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un problema al completar el perfil.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      console.error('Error al completar el perfil:', error.response?.data.message || error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        maxW={{ base: '90%', sm: '400px' }} // Tamaño responsivo del modal
        p={{ base: 2, sm: 6 }} // Padding responsivo
      >
        <ModalHeader>Completa tu perfil</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id="firstName" isRequired>
              <FormLabel>Nombres</FormLabel>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ingresa tu nombre"
              />
            </FormControl>

            <FormControl id="lastName" isRequired mt={4}>
              <FormLabel>Apellidos</FormLabel>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ingresa tus apellidos"
              />
            </FormControl>

            <FormControl id="age" isRequired mt={4}>
              <FormLabel>Edad</FormLabel>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min={6}
                placeholder="Ingresa tu edad"
              />
            </FormControl>

            <FormControl id="grade" isRequired mt={4}>
              <FormLabel>Grado</FormLabel>
              <Select
                placeholder="Selecciona un grado"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="2nd Grade">2nd Grade</option>
                <option value="3rd Grade">3rd Grade</option>
                <option value="4th Grade">4th Grade</option>
              </Select>
            </FormControl>

            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              width="full"
              className="submit-button"
            >
              Guardar
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CompleteProfileModal;
