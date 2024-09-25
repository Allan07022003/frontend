export const fetchRandomImageFromPixabay = async (difficulty) => {
    const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;
    
    console.log('API KEY utilizada:', API_KEY); // Verifica que la clave API está cargada
  
    let query;
    if (difficulty === 'easy') {
      query = 'cat, dog, bird'; // Consulta para imágenes fáciles
    } else if (difficulty === 'medium') {
      query = 'elephant, horse, tree'; // Consulta para imágenes de dificultad media
    } else if (difficulty === 'hard') {
      query = 'crocodile, airplane, building'; // Consulta avanzada para dificultad alta
    }
  
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=3`;
    
    console.log('URL de la API de Pixabay:', url);  // Verifica la URL completa
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Respuesta de la API:', data);
  
      if (data.hits && data.hits.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        const selectedImage = data.hits[randomIndex];
  
        const word = selectedImage.tags.split(',')[0].trim();
  
        return {
          imageUrl: selectedImage.webformatURL,
          word: word
        };
      } else {
        console.error('No se encontraron imágenes');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener imagen de Pixabay:', error);
      return null;
    }
  };
  