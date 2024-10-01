import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const AnimatedIcon = ({ animationUrl }) => {
  if (!animationUrl) {
    return <div>Cargando animación...</div>; 
  }

  return (
    <div className="my-4 flex justify-center animation-container">
      <Player
        autoplay
        loop
        src={animationUrl}
        className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 xl:w-56 xl:h-56"
      />
    </div>
  );
};



export default AnimatedIcon;
