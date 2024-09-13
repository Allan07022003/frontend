import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MathDashboard from './subjects/Math/MathDashboard'; // Dashboard de matemáticas
import FractionBoard from './subjects/Math/Fractions/FractionBoard'; // Tablero de fracciones
import SubtractionActivity from './subjects/Math/subtraction/SubtractionActivity'; // Actividad de restas con tiras
import { AssistantProvider } from './context/AssistantContext'; // Proveedor del contexto del asistente
import { Toaster } from 'react-hot-toast'; // Notificaciones

function App() {
  return (
    <AssistantProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <Toaster position="bottom-left" reverseOrder={false} />
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={<h1 className="text-center text-2xl">Welcome to Montessori Platform</h1>} />

            {/* Ruta del dashboard de matemáticas */}
            <Route path="/math" element={<MathDashboard />} />

            {/* Ruta para fracciones */}
            <Route path="/math/fractions" element={<FractionBoard />} />

            {/* Ruta para la actividad de restas con tiras */}
            <Route path="/math/subtraction" element={<SubtractionActivity />} />
  
          </Routes>
        </div>
      </Router>
    </AssistantProvider>
  );
}

export default App;
