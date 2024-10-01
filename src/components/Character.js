import React from 'react';

const Character = ({ message, expression }) => {
  return (
    <div className="character-container flex items-center justify-center p-4">
      <img src={expression || "/path-to-default-character-image.png"} alt="Character" className="w-16 h-16" />
      <div className="message-box bg-blue-100 text-blue-800 p-2 rounded-md ml-4">
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{message}</p>
      </div>
    </div>
  );
};

export default Character;
