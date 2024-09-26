export const fetchRandomImageFromPixabay = async (difficulty) => {
  // Usa la variable de entorno que configuraste en Vercel
  const API_KEY = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;

  let query;
  if (difficulty === 'easy') {
      query = 'cat, dog, bird'; // Palabras más simples
  } else if (difficulty === 'medium') {
      query = 'elephant, horse, monkey'; // Palabras más largas
  } else if (difficulty === 'hard') {
      query = 'crocodile, hippopotamus, rhinoceros'; // Palabras complicadas
  }

  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=3`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.hits && data.hits.length > 0) {
          // Seleccionar una imagen aleatoria de los resultados
          const randomIndex = Math.floor(Math.random() * data.hits.length);
          const selectedImage = data.hits[randomIndex];

          // Obtener la primera etiqueta (tag) que representa la palabra asociada a la imagen
          const word = selectedImage.tags.split(',')[0].trim();

          return {
              imageUrl: selectedImage.webformatURL,
              word: word // Devolver la palabra asociada a la imagen para que el niño la forme
          };
      } else {
          return null;
      }
  } catch (error) {
      console.error('Error fetching image from Pixabay:', error);
      return null;
  }
};
