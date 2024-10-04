import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import {CoursesPage} from "./pages/CoursesPage/CoursesPage.tsx";
import {path} from "./paths.ts";
import {useEffect, useState} from "react";
import {CourseProp} from "./types.ts";
import {getCourses} from "./api/ApiCourses.ts";

export default function AppRoutes() {

    const [courses, setCourses] = useState<CourseProp[] | null>([]);

    useEffect(() => {
      const getDataCourses = async () => {
        const res = await getCourses();
        setCourses(res);
      };
      getDataCourses();
    }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={path.HOME} element={<HomePage courses={courses}/>}/>
        <Route path={path.COURSE} element={<CoursesPage courses={courses} />} />
      </Routes>
    </BrowserRouter>
  );
}
