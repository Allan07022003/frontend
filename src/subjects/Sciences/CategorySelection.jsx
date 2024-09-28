import React from 'react';
import { Link } from 'react-router-dom';
import CustomHeader from '../../components/Header2'; // Asegúrate de importar el nuevo Header correctamente

const CategorySelection = () => {
  const categories = [
    {
      title: 'Biología Básica',
      description: 'Clasificación de seres vivos y no vivos.',
      imgSrc: 'https://res.cloudinary.com/drl8mphdx/image/upload/v1727501537/uqfq0fpnezcyryimliyr.jpg',
      path: '/sciences/biologia-basica',
    },
    {
      title: 'Recursos Naturales',
      description: 'Clasificación de recursos naturales y objetos artificiales.',
      imgSrc: 'https://res.cloudinary.com/drl8mphdx/image/upload/v1727501542/v18lracae6fj5ozpm26p.png',
      path: '/sciences/recursos-naturales',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 bg-gradient-to-r from-blue-100 via-purple-200 to-pink-100">
      {/* Header con solo el botón de inicio */}
      <CustomHeader 
        title="Ciencias Montessori"
        leftButtonText="Inicio"
        leftButtonHref="/dashboard"
        primaryColor="from-blue-500 to-purple-600"
        secondaryColor="bg-pink-500 hover:bg-pink-400"
        showLeftButton={true}
        showRightButton={false}
      />

      <h1 className="text-4xl font-bold text-purple-800 mb-10 text-center">
        Elige una categoría para practicar
      </h1>

      {/* Contenedor centrado y responsive de las cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center items-center w-full max-w-4xl px-4">
        {categories.map((category) => (
          <Link
            to={category.path}
            key={category.title}
            className="group bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-all duration-300 w-full max-w-xs sm:max-w-md mx-auto"
          >
            <img
              src={category.imgSrc}
              alt={category.title}
              className="w-24 h-24 object-cover mb-4 rounded-full shadow-md"
            />
            <h2 className="text-2xl font-bold mb-2 text-center">{category.title}</h2>
            <p className="text-sm text-center">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;
