export const fetchRandomWord = async (difficulty) => {
    let minLetters, maxLetters;
  
    switch (difficulty) {
      case 'easy':
        minLetters = 2;
        maxLetters = 4;
        break;
      case 'medium':
        minLetters = 5;
        maxLetters = 7;
        break;
      case 'hard':
        minLetters = 8;
        maxLetters = 12;
        break;
      default:
        minLetters = 2;
        maxLetters = 4;
    }
  
    const response = await fetch(`https://random-word-api.herokuapp.com/word?number=1&length=${minLetters}-${maxLetters}`);
    const word = await response.json();
    return word[0];
  };
  