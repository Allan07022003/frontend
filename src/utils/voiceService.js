let currentAudio = null;

export const speak = async (text) => {
  try {
    if (currentAudio) {
      currentAudio.pause();  
      currentAudio.currentTime = 0; 
    }

    const response = await fetch('https://backend-montessori-c4e81f9ce871.herokuapp.com/api/speak', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }), // Enviar el texto a convertir en voz
    });

    if (!response.ok) {
      throw new Error('Error al obtener la voz');
    }

    // Obtener el archivo de audio como Blob y reproducirlo
    const audioBlob = await response.blob();
    const audioUrl = window.URL.createObjectURL(audioBlob);
    currentAudio = new Audio(audioUrl);
    currentAudio.play();
  } catch (error) {
    console.error('Error al intentar hablar:', error);
  }
};
