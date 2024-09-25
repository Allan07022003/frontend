export const fetchImageFromPixabay = async (query) => {
    const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=3`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.hits && data.hits.length > 0) {
        return data.hits[0].webformatURL; // Retornar la primera imagen encontrada
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching image from Pixabay:', error);
      return null;
    }
  };
  