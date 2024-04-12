import React from "react";
import CardLinks from "../components/CardLinks";

export default function Home() {
  const linksCards = [
    {
      title: "Consultar Tituladas",
      description: 'Consulta información de los distintos ambientes',
      href: "/consultar/tituladas",
      img: "/src/assets/cap.png",
    },
    {
      title: "Consultar Instructores",
      description: 'Consulta información de los distintos Instructores',
      href: "/consultar/instructores",
      img: "/src/assets/instructor.png",
    },
    {
      title: "Consultar Ambientes",
      description: 'Consulta información de los distintos ambientes',
      href: "/consultar/ambientes",
      img: "/src/assets/ambiente.png",
    },
  ];
  return (
    <div className="space-y-10">
      <h1 className="font-black text-center text-5xl">¡Bienvenido a Pai!</h1>

      <div className="flex gap-4 items-center justify-center">
        {linksCards.map((card, index) => (
          <CardLinks index={index} card={card}/>
        ))}
      </div>
    </div>
  );
}
