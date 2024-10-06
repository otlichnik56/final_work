import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutsContext";

export default function useCourses() {
  return useContext(WorkoutsContext);
}