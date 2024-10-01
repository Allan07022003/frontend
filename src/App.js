import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// rutas de materias
import MathDashboard from "./subjects/Math/MathDashboard";
import FractionBoard from "./subjects/Math/Fractions/FractionBoard";
import SubtractionActivity from "./subjects/Math/subtraction/SubtractionActivity";
import Activity from "./subjects/Lenguaje/Activity";

import { AssistantProvider } from "./context/AssistantContext";
import { Toaster } from "react-hot-toast";

// Importaciones necesarias para React DnD
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

// Importaciones para el sistema de autenticación
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminDashboard from "./pages/adminDashboard";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordForm from "./pages/NewPassword";

// Nuevas rutas para el módulo de Ciencias
import CategorySelection from "./subjects/Sciences/CategorySelection";
import BiologiaBasica from "./subjects/Sciences/Pages/BiologiaBasica";
import CicloDeVida from "./subjects/Sciences/Pages/BodyWithOrgans";

function App() {
  return (
    <AssistantProvider>
<DndProvider backend={TouchBackend}>

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
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordForm />}
              />

              {/* Ruta protegida del dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Rutas para matemáticas */}
              <Route
                path="/math"
                element={
                  <ProtectedRoute>
                    <MathDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/math/fractions"
                element={
                  <ProtectedRoute>
                    <FractionBoard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/math/subtraction"
                element={
                  <ProtectedRoute>
                    <SubtractionActivity />
                  </ProtectedRoute>
                }
              />

              {/* Ruta para el módulo de lenguaje */}
              <Route
                path="/language"
                element={
                  <ProtectedRoute>
                    <Activity />
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

              {/* Rutas para el módulo de Ciencias */}
              <Route
                path="/sciences"
                element={
                  <ProtectedRoute>
                    <CategorySelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sciences/biologia-basica"
                element={
                  <ProtectedRoute>
                    <BiologiaBasica />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sciences/cuerpo-humano"
                element={
                  <ProtectedRoute>
                    <CicloDeVida />
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
