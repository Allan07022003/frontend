import React from 'react';
import { Link } from 'react-router-dom';
import CustomHeader from '../../components/Header2'; 

const MathDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-200 to-pink-100">
      <CustomHeader 
        title="Matemáticas Montessori" 
        leftButtonText="Inicio" 
        leftButtonHref="/dashboard" 
        primaryColor="from-blue-500 to-purple-600" 
        secondaryColor="bg-pink-500 hover:bg-pink-400" 
        showLeftButton={true} 
        showRightButton={false} 
      />
      
      <h1 className="text-5xl font-bold text-purple-800 mt-20 mb-8 text-center">
        Selecciona una Actividad de Matemáticas
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl px-4">
        <Link to="/math/fractions" className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Fracciones</h2>
            <p className="text-lg">Explora y practica la división de fracciones en este módulo interactivo.</p>
          </div>
        </Link>
        <Link to="/math/subtraction" className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Restas</h2>
            <p className="text-lg">Practica las restas con tiras Montessori de forma interactiva.</p>
          </div>
        </Link>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xl text-purple-700">Explora las actividades matemáticas inspiradas en Montessori.</p>
      </div>
    </div>
  );
};

export default MathDashboard;
