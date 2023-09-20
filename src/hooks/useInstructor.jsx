import { useContext } from "react";
import InstructorContext from "../context/InstructorProvider";

export default function useInstructor() {
    return useContext(InstructorContext)
}
