import { useContext } from "react";
import { CoursesContext } from "../context/CoursesContext.tsx";

export default function useCourses() {
  return useContext(CoursesContext);
}