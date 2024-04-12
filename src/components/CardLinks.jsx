import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom'; // Corrected the spelling of useNavigate

export default function CardLinks({ index, card }) {
    const navigate = useNavigate(); // Corrected the spelling of useNavigate here as well

    const handleRedirection = (href) => {
        navigate(href);
    }

    return (
        <Card key={index} onPress={() => handleRedirection(card.href)} isPressable className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col gap-2 items-start">
                <div>
                    <p className="text-tiny uppercase font-bold">{card.title}</p>
                    <small className="text-default-500">{card.description}</small>
                </div>
                <img className="object-contain mx-auto" src={card.img} alt={card.title} />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="/images/hero-card-complete.jpeg"
                    width={270}
                />
            </CardBody>
        </Card>
    );
}
