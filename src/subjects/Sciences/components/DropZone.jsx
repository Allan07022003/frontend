import React from "react";
import { useDrop } from "react-dnd";

const DropZone = ({ type, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "IMAGE",
    drop: (item) => onDrop(item.type === type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`w-full h-32 p-4 border-4 border-dashed ${
        isOver ? "border-green-400" : "border-gray-400"
      } rounded-md flex items-center justify-center text-lg font-bold ${
        isOver ? "bg-green-200" : "bg-white"
      }`}
    >
      {type}
    </div>
  );
};

export default DropZone;
