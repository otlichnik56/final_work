import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { paths } from "./lib/paths";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPage from "./pages/ResetPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import HomePage from "./pages/HomePage/HomePage";
import WorkoutPage from "./pages/WorkoutPage/WorkoutPage";
import { CourseType } from './types/courses';
import { getCourses } from "./api/apiCourse";
// import WorkoutSelectPage from "./pages/WorkoutSekectPage/WorkoutSekectPage";

export const AppRoutes = () => {

  const [courses, setCourses] = useState<CourseType[] | null>([]);

  useEffect(() => {
    const getDataCourses = async () => {
      const res = await getCourses();
      setCourses(res);
    };
    getDataCourses();
  }, []);


  return (
    <Routes>
      <Route path={paths.LOGIN} element={<LoginPage />} />
      {/* <Route path={paths.LOGIN} element={<WorkoutSelectPage />} /> //проверяла работу страницы */}
      <Route path={paths.REGISTER} element={<RegisterPage />} />
      <Route path={paths.RESET} element={<ResetPage />} />
      <Route path={paths.NEWPASSWORD} element={<NewPasswordPage />} />
      <Route path={paths.HOME} element={<HomePage courses={courses}/>} />
      <Route path={paths.COURSE} element={<CoursesPage courses={courses}/>} />
      <Route path={paths.WORKOUT} element={<WorkoutPage/>} />
    </Routes>
  );
}

export default AppRoutes;
