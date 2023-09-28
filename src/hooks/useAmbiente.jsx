import { useContext } from "react";
import AmbienteContext from "../context/AmbienteProvider";

export default function useAmbiente() {
  return useContext(AmbienteContext)
}
