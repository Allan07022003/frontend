import React from "react";
import { useDrag } from "react-dnd";
import { speak } from "../../../utils/voiceService";

const organTranslations = {
  corazon: "corazón",
  pulmones: "pulmones",
  estomago: "estómago",
  higado: "hígado", 
  rinones: "riñones", 
  intestinos: "intestinos",
  cerebro: "cerebro",
};

const Organ = ({ name, imageUrl }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "organ",
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: () => {
      const organNameInSpanish = organTranslations[name];
      speak(organNameInSpanish);
      return { name };
    }
  }));

  return (
    <div
      ref={drag}
      className="organ"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <img
        src={imageUrl}
        alt={organTranslations[name]} 
        className="organ-img"
        style={{
          width: "8vw", 
          maxWidth: "100px", 
          height: "auto", 
          objectFit: "contain", 
        }}
      />
      <p>{organTranslations[name]}</p>
    </div>
  );
};

export default Organ;
