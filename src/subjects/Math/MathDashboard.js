import React from 'react';
import { Link } from 'react-router-dom';

const MathDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold mb-8">Selecciona una Actividad de Matemáticas</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <Link to="/math/fractions" className="bg-blue-500 text-white py-4 px-6 rounded-lg text-2xl hover:bg-blue-600">
          Fracciones
        </Link>
        <Link to="/math/subtraction" className="bg-red-500 text-white py-4 px-6 rounded-lg text-2xl hover:bg-red-600">
          Restas
        </Link>
      </div>
    </div>
  );
};

export default MathDashboard;
