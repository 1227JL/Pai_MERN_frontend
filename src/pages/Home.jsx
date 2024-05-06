import React from "react";
import CardLinks from "../components/CardLinks";

export default function Home() {
  const linksCards = [
    {
      title: "Consultar Tituladas",
      description: "Consulta información de los distintos ambientes",
      href: "/consultar/tituladas",
      img: "/src/assets/cap.png",
    },
    {
      title: "Consultar Instructores",
      description: "Consulta información de los distintos Instructores",
      href: "/consultar/instructores",
      img: "/src/assets/instructor.png",
    },
    {
      title: "Consultar Ambientes",
      description: "Consulta información de los distintos ambientes",
      href: "/consultar/ambientes",
      img: "/src/assets/ambiente.png",
    },
  ];
  return (
    <div className="space-y-10">
      <h1 className="font-black text-center text-5xl">¡Bienvenido a Pai!</h1>

      <div className="mx-auto w-2/3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {linksCards.map((card, index) => (
          <CardLinks key={index} card={card} />
        ))}
      </div>
    </div>
  );
}
