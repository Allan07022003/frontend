export const fetchRandomImageFromPixabay = async (difficulty) => {
    const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;
    
    let query;
    if (difficulty === 'easy') {
      query = 'animal'; // Consulta amplia para imágenes fáciles
    } else if (difficulty === 'medium') {
      query = 'object'; // Consulta para imágenes de dificultad media
    } else if (difficulty === 'hard') {
      query = 'transport, technology'; // Consulta más avanzada para dificultad alta
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
  