export const generateRandomSubtraction = () => {
    const minuend = Math.floor(Math.random() * 18) + 1;
    const subtrahend = Math.floor(Math.random() * minuend);
    return { minuend, subtrahend };
  };
  