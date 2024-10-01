const generateSubtractions = (difficulty, existingSubtractions) => {
  let maxMinuendo;

  if (difficulty === 1) { 
    maxMinuendo = 8;
  } else if (difficulty === 2) { 
    maxMinuendo = 12;
  } else if (difficulty === 3) { 
    maxMinuendo = 20;
  }

  let minuendo, sustraendo;
  
  do {
    minuendo = Math.floor(Math.random() * maxMinuendo) + 1;
    sustraendo = Math.floor(Math.random() * minuendo);
  } while (
    sustraendo === 0 || 
    minuendo === 0 || 
    existingSubtractions.some(ejercicio => ejercicio.minuendo === minuendo && ejercicio.sustraendo === sustraendo)
  ); 

  return { minuendo, sustraendo };
};

export default generateSubtractions;
