import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Header from '../components/Header'; // Importamos el Header

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', email: '', password: '', age: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [teacherGrade, setTeacherGrade] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Obtener estudiantes asignados al maestro autenticado y el grado del maestro
  useEffect(() => {
    const fetchStudentsAndTeacherInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('No se encontró el token de autenticación');
          return;
        }

        const response = await axios.get('https://backend-montessori-c4e81f9ce871.herokuapp.com/api/teachers/students', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setStudents(response.data);

        // Obtener el grado del maestro
        const teacherResponse = await axios.get('https://backend-montessori-c4e81f9ce871.herokuapp.com/api/teachers/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTeacherGrade(teacherResponse.data.grade);
      } catch (error) {
        console.error('Error fetching students and teacher info:', error);
        toast.error('Error al obtener la información del maestro');
      }
    };

    fetchStudentsAndTeacherInfo();
  }, []);

  // Manejar la entrada en los formularios
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // Crear un nuevo estudiante
  const handleCreateStudent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://backend-montessori-c4e81f9ce871.herokuapp.com/api/teachers/students/create', 
        { ...newStudent, grade: teacherGrade },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setStudents([...students, response.data]);
      toast.success('Estudiante creado exitosamente');
      setNewStudent({ firstName: '', lastName: '', email: '', password: '', age: '' });
      onClose();
    } catch (error) {
      console.error('Error creating student:', error);
      toast.error('Error al crear el estudiante');
    }
  };

  // Editar un estudiante (abre el modal con los datos del estudiante)
  const handleEditStudent = (student) => {
    setIsEditing(true);
    setCurrentStudentId(student._id);
    setNewStudent({ firstName: student.firstName, lastName: student.lastName, email: student.email, password: '', age: student.age });
    onOpen();
  };

  // Actualizar un estudiante
  const handleUpdateStudent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://backend-montessori-c4e81f9ce871.herokuapp.com/api/teachers/students/${currentStudentId}`, 
        { ...newStudent, grade: teacherGrade },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setStudents(students.map((student) => (student._id === currentStudentId ? response.data : student)));
      toast.success('Estudiante actualizado exitosamente');
      setIsEditing(false);
      setNewStudent({ firstName: '', lastName: '', email: '', password: '', age: '' });
      onClose();
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error('Error al actualizar el estudiante');
    }
  };

  // Eliminar un estudiante
  const handleDeleteStudent = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://backend-montessori-c4e81f9ce871.herokuapp.com/api/teachers/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(students.filter(student => student._id !== id)); 
      toast.success('Estudiante eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Error al eliminar el estudiante');
    }
  };

  return (
    <>
      {/* Header global con el botón de cerrar sesión */}
      <Header
        title="Panel de Administración"
        leftButtonText="Inicio"
        leftButtonHref="/dashboard"
        onLogout={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}
        rightButtonText="Crear Estudiante"
        onCompleteProfileClick={onOpen} // Al hacer click en el botón "Crear Estudiante" se abre el modal
      />

      {/* Ajustamos el espacio debajo del header */}
      <Box maxW="4xl" mx="auto" mt="24" p="6" borderRadius="lg" boxShadow="xl" bg="white" textAlign="center" fontFamily="'Comic Sans MS', cursive, sans-serif">
        <Heading mb="4" fontSize="2xl" color="#5A67D8">
          Estudiantes Asignados
        </Heading>
        <Text mb="4" color="#4A5568">
          Aquí puedes gestionar la información de los estudiantes.
        </Text>

        {/* Tabla de estudiantes */}
        <Table variant="striped" colorScheme="teal" mb="6">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Grado</Th>
              <Th>Edad</Th> {/* Añadimos la columna de Edad */}
              <Th>Email</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((student) => (
              <Tr key={student._id}>
                <Td>{student.firstName} {student.lastName}</Td>
                <Td>{student.grade || 'No asignado'}</Td>
                <Td>{student.age || 'Sin edad registrada'}</Td> {/* Mostrar la edad */}
                <Td>{student.email}</Td>
                <Td>
                  <Button colorScheme="teal" size="sm" mr="2" onClick={() => handleEditStudent(student)}>
                    Editar
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleDeleteStudent(student._id)}>
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Modal para Crear/Editar Estudiantes */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{isEditing ? 'Editar Estudiante' : 'Crear Nuevo Estudiante'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Nombre"
                name="firstName"
                value={newStudent.firstName}
                onChange={handleInputChange}
                mb="4"
              />
              <Input
                placeholder="Apellido"
                name="lastName"
                value={newStudent.lastName}
                onChange={handleInputChange}
                mb="4"
              />
              <Input
                placeholder="Email"
                name="email"
                value={newStudent.email}
                onChange={handleInputChange}
                mb="4"
              />
              <Input
                placeholder="Contraseña"
                name="password"
                type="password"
                value={newStudent.password}
                onChange={handleInputChange}
                mb="4"
              />
              <Input
                placeholder="Edad"  
                name="age"
                type="number"
                value={newStudent.age}
                onChange={handleInputChange}
                mb="4"
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={isEditing ? handleUpdateStudent : handleCreateStudent}>
                {isEditing ? 'Actualizar Estudiante' : 'Crear Estudiante'}
              </Button>
              <Button onClick={onClose} ml="2">Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default AdminDashboard;
