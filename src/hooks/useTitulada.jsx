import { useContext } from "react";
import TituladaContext from "../context/TituladaProvider";

const useTitulada = () => {
    return useContext(TituladaContext)
}

export default useTitulada