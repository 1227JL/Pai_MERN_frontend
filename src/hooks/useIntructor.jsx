import { useContext } from "react";
import InstructorContext from "../context/InstructorProvider";

export default function useIntructor() {
    return useContext(InstructorContext)
}
