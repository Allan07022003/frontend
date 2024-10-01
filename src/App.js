import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MathDashboard from "./subjects/Math/MathDashboard";
import FractionBoard from "./subjects/Math/Fractions/FractionBoard";
import SubtractionActivity from "./subjects/Math/subtraction/SubtractionActivity";
import Activity from "./subjects/Lenguaje/Activity";

import { AssistantProvider } from "./context/AssistantContext";
import { Toaster } from "react-hot-toast";

import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminDashboard from "./pages/adminDashboard";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordForm from "./pages/NewPassword";

import CategorySelection from "./subjects/Sciences/CategorySelection";
import BiologiaBasica from "./subjects/Sciences/Pages/BiologiaBasica";
import CicloDeVida from "./subjects/Sciences/Pages/BodyWithOrgans";

function App() {
  return (
    <Router>
      <AssistantProvider>
        <DndProvider backend={TouchBackend}>
          <div className="min-h-screen bg-gray-100 text-gray-900">
            <Toaster position="bottom-left" reverseOrder={false} />
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordForm />}
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
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
              <Route
                path="/language"
                element={
                  <ProtectedRoute>
                    <Activity />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/adminDashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
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
        </DndProvider>
      </AssistantProvider>
    </Router>
  );
}

export default App;
