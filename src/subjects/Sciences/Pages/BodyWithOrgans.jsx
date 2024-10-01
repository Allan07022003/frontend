  import React, { useState } from "react";
  import Organ from "../components/Organ";
  import { DndProvider, useDrop } from "react-dnd";
  import { HTML5Backend } from "react-dnd-html5-backend";
  import { TouchBackend } from "react-dnd-touch-backend";
  import { isMobile } from "react-device-detect";
  import organImages from "../../../utils/organImages";
  import { speak } from "../../../utils/voiceService";
  import { useAssistant } from "../../../context/AssistantContext";
  import Header from "../components/Header"; 

  const organTranslations = {
    corazon: "corazón",
    pulmones: "pulmones",
    estomago: "estómago",
    hígado: "hígado",
    riñones: "riñones",
    intestinos: "intestinos",
    cerebro: "cerebro",
  };

  const BodyPart = ({ accept, organPlaced, onDrop, cx, cy, width, height }) => {
    const { showAssistantMessage } = useAssistant();

    const isOrganPlural = {
      "riñones": true,
      "pulmones": true,
      "estómago": false,
      "corazón": false,
      "hígado": false,
    };

    const [{ isOver }, drop] = useDrop(() => ({
      accept: "organ",
      drop: (item) => {
        const organNameInSpanish = organTranslations[accept];
        const isPlural = isOrganPlural[organNameInSpanish] || false;
    
        const getArticle = (name, isPlural) => {
          return isPlural ? (name.endsWith("as") ? "las" : "los") : name.endsWith("a") ? "la" : "el";
        };
    
        const getVerb = (isPlural) => (isPlural ? "pertenecen" : "pertenece");
    
        if (item.name === accept) {
          onDrop(item.name);
          const mensaje = `¡Buen trabajo! Has colocado ${getArticle(organNameInSpanish, isPlural)} ${organNameInSpanish}.`;
          showAssistantMessage(mensaje, "success");
    
          if (!isMobile) {
            speak(mensaje);
          } else {
            document.addEventListener('click', () => speak(mensaje), { once: true });
          }
          
        } else {
          const wrongOrganNameInSpanish = organTranslations[item.name];
          const isWrongOrganPlural = isOrganPlural[wrongOrganNameInSpanish] || false;
    
          showAssistantMessage(
            `Este órgano no pertenece aquí. Intenta con ${getArticle(organNameInSpanish, isPlural)} ${organNameInSpanish}.`,
            "error"
          );
    
          const errorMensaje = `Intenta colocar el órgano correcto. ${getArticle(wrongOrganNameInSpanish, isWrongOrganPlural)} ${wrongOrganNameInSpanish} no ${getVerb(isWrongOrganPlural)} aquí.`;
    
          if (!isMobile) {
            speak(errorMensaje);
          } else {
            document.addEventListener('click', () => speak(errorMensaje), { once: true });
          }
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
    

    return (
      <g ref={drop}>
        {organPlaced ? (
          <image href={organImages[accept]} x={cx} y={cy} width={width} height={height} />
        ) : (
          <circle
            cx={cx + width / 2}
            cy={cy + height / 2}
            r={Math.min(width, height) / 2}
            fill={isOver ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)"}
            stroke="black"
            strokeDasharray="4"
          />
        )}
      </g>
    );
  };

  const BodyWithOrgans = () => {
    const [organsPlaced, setOrgansPlaced] = useState({
      corazon: false,
      pulmones: false,
      estomago: false,
      hígado: false,
      riñones: false,
      intestinos: false,
      cerebro: false,
    });

    const handleDrop = (organName) => {
      setOrgansPlaced((prev) => ({
        ...prev,
        [organName]: true,
      }));
    };

    const resetOrgans = () => {
      setOrgansPlaced({
        corazon: false,
        pulmones: false,
        estomago: false,
        hígado: false,
        riñones: false,
        intestinos: false,
        cerebro: false,
      });
    };

    return (
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Header
          title="Cuerpo Humano"
          leftButtonText="Volver"
          leftButtonHref="../dashboard"
          rightButtonText="Actividades"
          rightButtonHref="/sciences"
          primaryColor="from-blue-400 to-purple-500"
          secondaryColor="bg-yellow-400 hover:bg-yellow-300"
          showResetButton={true} 
          onReset={resetOrgans} 
        />

        <div
          className="relative w-full h-screen flex justify-center items-center pt-20"
          style={{
            backgroundImage: `url('/mnt/data/image.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <svg version="1.1" viewBox="0 0 824 2048" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-[70vh]">
            <path
              transform="translate(396,31)"
              d="m0 0h17l22 3 15 5 11 7 12 10 7 6 8 14 5 8 5 15 2 10v18l-5 29 8-1 4 8v24l-3 8-7 11-6 9-1 1-8 1-3 17-4 8-2 6-2 14-1 21 1 12 16 8 23 10 16 9 12 7 22 10 15 5 17 4 19 7 13 10 10 8 12 12 10 14 5 10 7 16 7 19 4 17 1 7v21l-3 32v7l7 27 9 32 8 36 3 21v60l5 17 7 24 4 21 3 25 3 45 2 55 3 34 3 28 3 9 7 9 7 10 9 11 6 7 5 12 5 27 6 20 11 19 2 4v6l-3 2-10 1-9-3-10-9-4-5-2-1 2 8 5 48 1 15v17l-4 3-7-6-4-5-10-36-6-24v-3h-2l2 43v30l-2 6-3 2-5-1-4-9-6-26-5-28v25l-1 22-3 9-3 2-5-4-3-11-1-10h-2l-3 9-3 4h-5l-3-5v-60l-3-14-2-27-2-29v-12l2-17 3-15 2-5-2-9-11-28-4-12-5-17-17-54-5-19-9-30-4-22-1-11-2-60-5-12-12-27-6-19-4-19-3 4-3 8-4 36-4 50-1 83-2 12 1 11 6 24 2 11v23l-1 11 11 48 4 24 11 49 7 41 6 56 1 13 1 27v39l-2 28-4 35-4 48v33l4 40 2 47 6 20 8 29 4 20 3 60 1 25 1 52v72l-1 32v71l5 20 5 12 10 16 13 18 7 9 9 14 10 12 7 11 6 8 10 12 8 11 10 9 9 6 8 10 2 5v8l1 4-11 11-7 1-7 4-6 1-5-3-2 4-8 6-3 1h-12l-10-6-12-12-8-4-11-2-10-6-10-9-10-12-8-12-9-12-4-5-12-9-11-6-10-8-11-13-4-9-1-6 1-17 3-20v-6l-4-7-1-7 4-21v-14l-5-37-8-47-4-27-7-27-8-21-9-20-8-15-6-18-2-9-1-11v-62l4-33v-18l-6-16-6-18-4-24-2-30-3-19-7-17-11-22-9-23-4-14-11-33-8-32-5-24-12-45-2-8-3 13-6 28-15 62-5 23-12 36-6 16-5 13-13 25-2 10-1 9-2 40-3 21-6 16-5 8v9l7 48 2 24v32l-3 21-5 17-10 22-9 21-9 27-4 21-10 59-5 43v23l4 19-1 9-2 4 1 11 5 21v13l-4 10-12 14-8 7-13 8-11 7-9 9-11 16-8 11-7 8-5 5-8 6-10 5-12 2-10 9-9 7-7 3-9 1-10-4-5-5-4 2-9-1-5-4-7-1-7-7-3-2v-14l4-7 8-10 10-7 8-7 8-10 11-13 7-9 9-11 9-10 6-10 11-14 7-11 7-14 7-15 4-13 2-11v-45l-3-59-3-63v-80l2-38 4-40 5-32 6-18 1-5 1-40 4-31 1-7v-35l-4-33-9-64-1-12-1-39v-16l1-35 4-38 4-28 11-58 5-33 11-53v-11l-1-6v-24l5-25 3-10v-12l-3-19-1-21-1-52-7-63-3-23-5-15-3 8-6 20-9 24-8 19-4 8-3 70-4 22-8 31-8 26-12 38-6 22-10 27-7 17-1 4v8l4 20 1 13v19l-3 49-2 11-1 68-7 2-5-5-4-9-3 19-3 6-4 1-4-4-2-15v-37l1-4h-2l-1 10-6 34-5 20-3 3-7-2-2-4v-45l2-31h-2l-2 10-6 24-4 19-3 7-6 9-6 5-3-1-1-2v-26l5-47 1-14-11 12-7 4-4 1h-7l-7-3v-5l15-30 11-42 5-15 9-9 10-13 7-10 3-7 5-48 3-36 5-88 2-21 6-27 7-21 4-10 1-6-2-18v-24l4-36 3-18 6-24 12-40 2-11-1-18-1-36 2-22 5-17 6-15 10-19 6-11 12-14 16-13 18-12 27-7 13-4 25-14 18-10 13-8 16-7 14-7 2-3v-11l-2-33-4-7-5-7-3-13v-7h-11l-5-6-5-9-8-10-1-5v-21l2-7 3-3 7 1-4-16-1-9v-12l2-15 6-18 10-19 9-10 8-6 9-7 16-8 19-4z"
              fill="#F3C494"
            />
            <BodyPart accept="cerebro" organPlaced={organsPlaced.cerebro} onDrop={handleDrop} cx={320} cy={30} width={160} height={160} />
            <BodyPart accept="pulmones" organPlaced={organsPlaced.pulmones} onDrop={handleDrop} cx={300} cy={400} width={210} height={200} />
            <BodyPart accept="corazon" organPlaced={organsPlaced.corazon} onDrop={handleDrop} cx={460} cy={410} width={220} height={160} />
            <BodyPart accept="estomago" organPlaced={organsPlaced.estomago} onDrop={handleDrop} cx={430} cy={610} width={130} height={150} />
            <BodyPart accept="hígado" organPlaced={organsPlaced.hígado} onDrop={handleDrop} cx={270} cy={590} width={180} height={120} />
            <BodyPart accept="riñones" organPlaced={organsPlaced.riñones} onDrop={handleDrop} cx={300} cy={720} width={220} height={200} />
            <BodyPart accept="intestinos" organPlaced={organsPlaced.intestinos} onDrop={handleDrop} cx={290} cy={850} width={250} height={300} />
          </svg>

          <div>
            <style>
              {`
                .organs {
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                  flex-wrap: wrap;
                  width: 100%;
                }

                .organ-img {
                  width: 10vw;
                  height: auto;
                  max-width: 120px;
                  object-fit: contain;
                }
              `}
            </style>
            <div className="organs-container absolute bottom-0 left-0 w-full p-2 bg-white">
              <div className="block md:hidden overflow-x-auto">
                <div className="flex gap-4 justify-start px-4">
                  {[
                    { name: "corazon", label: "Corazón" },
                    { name: "pulmones", label: "Pulmones" },
                    { name: "estomago", label: "Estómago" },
                    { name: "hígado", label: "Hígado" },
                    { name: "riñones", label: "Riñones" },
                    { name: "intestinos", label: "Intestinos" },
                    { name: "cerebro", label: "Cerebro" },
                  ].map((organ) => (
                    <div key={organ.name} className="flex flex-col items-center min-w-[80px]">
                      <p className="text-center text-xs font-bold mb-1 text-gray-800">{organ.label}</p>
                      <Organ name={organ.name} imageUrl={organImages[organ.name]} className="max-w-[60px]" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:grid md:grid-cols-7 gap-16 justify-items-center">
                {[
                  { name: "corazon", label: "Corazón" },
                  { name: "pulmones", label: "Pulmones" },
                  { name: "estomago", label: "Estómago" },
                  { name: "hígado", label: "Hígado" },
                  { name: "riñones", label: "Riñones" },
                  { name: "intestinos", label: "Intestinos" },
                  { name: "cerebro", label: "Cerebro" },
                ].map((organ) => (
                  <div key={organ.name} className="flex flex-col items-center">
                    <p className="text-center text-sm font-bold mb-1 text-gray-800">{organ.label}</p>
                    <Organ name={organ.name} imageUrl={organImages[organ.name]} className="max-w-[80px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DndProvider>
    );
  };

  export default BodyWithOrgans;
