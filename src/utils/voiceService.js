// utils/voiceService.js

export const speak = async (text) => {
    try {
      // Realizar la solicitud POST al backend
      const response = await fetch('https://backend-montessori-c4e81f9ce871.herokuapp.com/api/speak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }), // Enviar el texto a convertir en voz
      });
  
      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Error al obtener la voz');
      }
  
      // Obtener el archivo de audio como Blob y reproducirlo
      const audioBlob = await response.blob();
      const audioUrl = window.URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Error al intentar hablar:', error);
    }
  };
  