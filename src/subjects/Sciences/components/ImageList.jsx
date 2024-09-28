import React from "react";
import { useDrag } from "react-dnd";

// Lista de imágenes de ejemplo
const images = [
  { id: 1, src: "https://example.com/plant.png", type: "Vivo" },
  { id: 2, src: "https://example.com/rock.png", type: "No Vivo" },
  // Agrega más imágenes aquí...
];

const ImageList = () => {
  return (
    <div className="w-full sm:w-1/2 grid grid-cols-2 gap-4 p-2 bg-white rounded-md shadow-md">
      {images.map((image) => (
        <DraggableImage key={image.id} src={image.src} type={image.type} />
      ))}
    </div>
  );
};

// Componente para las imágenes que se pueden arrastrar
const DraggableImage = ({ src, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "IMAGE",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={src}
      alt={type}
      className={`w-full h-full object-contain rounded-md cursor-pointer transition-opacity ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    />
  );
};

export default ImageList;
