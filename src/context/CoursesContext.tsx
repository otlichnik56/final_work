import { createContext, useState, ReactNode } from "react";
import { CourseType } from "../types/courses.ts";

type ProviderProps = {
  children: ReactNode;
};

type ContextCoursesType = {
  courses: CourseType[] | null;
  loading: boolean;
  error: string | null;
  setCourses: (courses: CourseType[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const CoursesContext = createContext<ContextCoursesType | null>(null);

export default function CoursesProvider({ children }: ProviderProps) {
  const [courses, setCourses] = useState<CourseType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <CoursesContext.Provider
      value={{ courses, setCourses, loading, setLoading, error, setError }}
    >
      {children}
    </CoursesContext.Provider>
  );
}