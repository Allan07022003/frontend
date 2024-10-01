import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  useMediaQuery,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from "../components/Header";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    grade: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [teacherGrade, setTeacherGrade] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)"); // Media query para responsividad

  useEffect(() => {
    const fetchStudentsAndTeacherInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No se encontró el token de autenticación");
        return;
      }

      try {
        const studentResponse = await axios.get(
          "https://backend-montessori-c4e81f9ce871.herokuapp.com/api/teachers/students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!studentResponse.data || studentResponse.data.length === 0) {
          toast.error("No se encontraron estudiantes asignados");
          return;
        }

        setStudents(studentResponse.data);
      } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
        toast.error("Error al obtener los estudiantes");
        return;
      }

      try {
        const teacherResponse = await axios.get(
          "https://backend-montessori-c4e81f9ce871.herokuapp.com/api/teachers/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!teacherResponse.data || !teacherResponse.data.grade) {
          toast.error("No se pudo obtener el grado del maestro");
          return;
        }

        setTeacherGrade(teacherResponse.data.grade);
      } catch (error) {
        console.error("Error al obtener la información del maestro:", error);
        toast.error("Error al obtener la información del maestro");
      }
    };

    fetchStudentsAndTeacherInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const validateForm = () => {
    const { firstName, lastName, email, age, grade } = newStudent;

    if (!firstName || !lastName || !email || !age || !grade) {
      toast.error("Por favor completa todos los campos");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Correo electrónico no válido");
      return false;
    }

    if (age <= 4) {
      toast.error("La edad debe ser mayor a 4");
      return false;
    }

    return true;
  };

  const handleCreateStudent = async () => {
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://backend-montessori-c4e81f9ce871.herokuapp.com/api/teachers/students/create",
        {
          ...newStudent,
          grade: teacherGrade,
          registeredBy: "teacher_id",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents([...students, response.data]);
      toast.success("Estudiante creado exitosamente");
      setNewStudent({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        age: "",
        grade: "",
      });
      setIsEditing(false); 
      onClose();
    } catch (error) {
      console.error("Error creando estudiante:", error);
      toast.error("Error al crear el estudiante");
    }
  };

  const handleOpenCreateStudent = () => {
    setIsEditing(false); 
    setNewStudent({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      age: "",
      grade: "",
    });
    onOpen();
  };

  const handleEditStudent = (student) => {
    setIsEditing(true); 
    setCurrentStudentId(student._id);
    setNewStudent({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      password: "", 
      age: student.age,
      grade: student.grade,
    });
    onOpen();
  };

  const handleUpdateStudent = async () => {
    if (!validateForm()) return; 

    try {
      const token = localStorage.getItem("token");
      const updateData = { ...newStudent, grade: teacherGrade };
      if (!newStudent.password) {
        delete updateData.password;
      }

      const response = await axios.put(
        `https://backend-montessori-c4e81f9ce871.herokuapp.com/api/teachers/students/${currentStudentId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(
        students.map((student) =>
          student._id === currentStudentId ? response.data : student
        )
      );
      toast.success("Estudiante actualizado exitosamente");
      setIsEditing(false); 
      setNewStudent({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        age: "",
        grade: "",
      });
      onClose();
    } catch (error) {
      console.error("Error actualizando estudiante:", error);
      toast.error("Error al actualizar el estudiante");
    }
  };

  const handleDeleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este estudiante?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://backend-montessori-c4e81f9ce871.herokuapp.com/api/teachers/students/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents(students.filter((student) => student._id !== id));
      toast.success("Estudiante eliminado exitosamente");
    } catch (error) {
      console.error("Error eliminando estudiante:", error);
      toast.error("Error al eliminar el estudiante");
    }
  };

  return (
    <>
      <Header
        title="Panel de Administración"
        leftButtonText="Inicio"
        leftButtonHref="/dashboard"
        onLogout={() => {
          const confirmLogout = window.confirm(
            "¿Estás seguro de que quieres cerrar sesión?"
          );
          if (confirmLogout) {
            localStorage.removeItem("token");
            localStorage.removeItem("profileComplete");
            localStorage.removeItem("childName");
            navigate("/login");
          }
        }}
        rightButtonText="Crear Estudiante"
        onCompleteProfileClick={handleOpenCreateStudent}
      />

      <Box
        maxW="4xl"
        mx="auto"
        mt={isSmallScreen ? "16" : "24"} 
        p="6"
        borderRadius="lg"
        boxShadow="xl"
        bg="white"
        textAlign="center"
        fontFamily="'Comic Sans MS', cursive, sans-serif"
      >
        <Heading mb="4" fontSize={isSmallScreen ? "xl" : "2xl"} color="#5A67D8">
          Estudiantes Asignados
        </Heading>
        <Text mb="4" color="#4A5568">
          Aquí puedes gestionar la información de los estudiantes.
        </Text>

        {/* Tabla responsiva */}
        <Box overflowX="auto">
          <Table variant="striped" colorScheme="teal" mb="6" size={isSmallScreen ? "sm" : "md"}>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Grado</Th>
                <Th>Edad</Th>
                <Th>Email</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {students.map((student) => (
                <Tr key={student._id}>
                  <Td>{student.firstName} {student.lastName}</Td>
                  <Td>{student.grade || "No asignado"}</Td>
                  <Td>{student.age || "Sin edad registrada"}</Td>
                  <Td>{student.email}</Td>
                  <Td>
                    <Button
                      colorScheme="teal"
                      size={isSmallScreen ? "xs" : "sm"}
                      mr="2"
                      onClick={() => handleEditStudent(student)}
                    >
                      Editar
                    </Button>
                    <Button
                      colorScheme="red"
                      size={isSmallScreen ? "xs" : "sm"}
                      onClick={() => handleDeleteStudent(student._id)}
                    >
                      Eliminar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {isEditing ? "Editar Estudiante" : "Crear Nuevo Estudiante"}
            </ModalHeader>
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
              <Select
                placeholder="Selecciona el grado"
                name="grade"
                value={newStudent.grade}
                onChange={handleInputChange}
                mb="4"
              >
                <option value="2nd Grade">2nd Grade</option>
                <option value="3rd Grade">3rd Grade</option>
                <option value="4th Grade">4th Grade</option>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={isEditing ? handleUpdateStudent : handleCreateStudent}
              >
                {isEditing ? "Actualizar Estudiante" : "Crear Estudiante"}
              </Button>
              <Button onClick={onClose} ml="2">
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default AdminDashboard;
