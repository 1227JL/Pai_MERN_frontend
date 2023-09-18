import React from "react";

import {Button} from "@nextui-org/react";

export default function Boton({children, onClick, type, classes}) {
  return (
    <Button type={type} className={classes} onClick={onClick} color="primary">
      {children}
    </Button>
  );
}
