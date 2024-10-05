import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutsContext.tsx";

export default function useCourses() {
  return useContext(WorkoutsContext);
}