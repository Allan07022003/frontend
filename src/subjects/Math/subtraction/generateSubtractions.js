//generateSubtractions.js
const generateSubtractions = () => {
    const minuendo = Math.floor(Math.random() * 9) + 1;  // Genera un número entre 1 y 9
    const sustraendo = Math.floor(Math.random() * minuendo); // Genera un número menor o igual al minuendo
    return { minuendo, sustraendo };
  };
  
  export default generateSubtractions;
  