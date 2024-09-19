import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MathDashboard from './subjects/Math/MathDashboard'; // Dashboard de matemáticas
import FractionBoard from './subjects/Math/Fractions/FractionBoard'; // Tablero de fracciones
import SubtractionActivity from './subjects/Math/subtraction/SubtractionActivity'; // Actividad de restas con tiras
import { AssistantProvider } from './context/AssistantContext'; // Proveedor del contexto del asistente
import { Toaster } from 'react-hot-toast'; // Notificaciones

// Importaciones necesarias para React DnD
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect'; // Detectar si es un dispositivo móvil

// Importaciones para el sistema de autenticación
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './utils/ProtectedRoute'; // Rutas protegidas
import AdminDashboard from './pages/adminDashboard'; // Importar la página de admin
import ResetPassword from './pages/ResetPassword'; // Importar la página de solicitud de restablecimiento de contraseña
import ResetPasswordForm from './pages/NewPassword'; // Importar la página de restablecimiento de contraseña con token

function App() {
  return (
    <AssistantProvider>
      {/* Configuración de React DnD con backend móvil o HTML5 dependiendo del dispositivo */}
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Router>
          <div className="min-h-screen bg-gray-100 text-gray-900">
            <Toaster position="bottom-left" reverseOrder={false} />
            <Routes>
              {/* Redirigir la ruta raíz al login */}
              <Route path="/" element={<Navigate to="/login" />} />

              {/* Rutas de autenticación */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Ruta para solicitud de restablecimiento de contraseña */}
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Nueva ruta para restablecer la contraseña utilizando el token */}
              <Route path="/reset-password/:token" element={<ResetPasswordForm />} />

              {/* Ruta protegida del dashboard */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Ruta del dashboard de matemáticas */}
              <Route 
                path="/math" 
                element={
                  <ProtectedRoute>
                    <MathDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Ruta para fracciones */}
              <Route 
                path="/math/fractions" 
                element={
                  <ProtectedRoute>
                    <FractionBoard />
                  </ProtectedRoute>
                } 
              />

              {/* Ruta para la actividad de restas con tiras */}
              <Route 
                path="/math/subtraction" 
                element={
                  <ProtectedRoute>
                    <SubtractionActivity />
                  </ProtectedRoute>
                } 
              />

              {/* Ruta para el panel de administración */}
              <Route 
                path="/adminDashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </DndProvider>
    </AssistantProvider>
  );
}

export default App;
