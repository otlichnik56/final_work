import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { paths } from "./lib/paths";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPage from "./pages/ResetPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import WorkoutPage from "./pages/WorkoutPage/WorkoutPage";
import WorkoutSelectPage from "./pages/WorkoutSelectPage/WorkoutSelectPage";
import { CourseType } from "./types/courses";
import { getCourses } from "./api/apiCourse";
import { getWorkouts } from "./api/apiCourse";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProgressPage from "./pages/ProgressPage";
import ProgressDonePage from "./pages/ProgressDonePage";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import HomePage from "./pages/HomePage/HomePage";
import { CoursesContext } from "./context/CoursesContext"; // Импорт контекста
import { WorkoutsContext } from "./context/WorkoutsContext";

export const AppRoutes = () => {

  const coursesContext = useContext(CoursesContext);
  const workoutsContext = useContext(WorkoutsContext);

  useEffect(() => {
    const getDataCourses = async () => {
      if (coursesContext) { // Проверка на null
        coursesContext.setLoading(true);
        try {
          const res = await getCourses();
          coursesContext.setCourses(res); // Установка курсов через контекст
        } catch (error) {
          coursesContext.setError("Ошибка при загрузке курсов");
        } finally {
          coursesContext.setLoading(false);
        }
      }
    };
    getDataCourses();
  }, []);

  useEffect(() => {
    const getDataWorkouts = async () => {
      if (workoutsContext) { // Проверка на null
        workoutsContext.setLoading(true);
        try {
          const res = await getWorkouts();
          workoutsContext.setWorkouts(res); // Установка курсов через контекст
        } catch (error) {
          workoutsContext.setError("Ошибка при загрузке тренировок");
        } finally {
          workoutsContext.setLoading(false);
        }
      }
    };
    getDataWorkouts();
  }, []);

  return (
    <Routes>
      <Route path={paths.HOME} element={<HomePage />} />
      <Route path={paths.LOGIN} element={<LoginPage />} />
      <Route path={paths.REGISTER} element={<RegisterPage />} />
      <Route path={paths.COURSE} element={<CoursesPage />} />
      <Route path={paths.RESET} element={<ResetPage />} />
      <Route path={paths.NEWPASSWORD} element={<NewPasswordPage />} />

      {/* Приватные маршруты */}
      <Route element={<PrivateRoute />}>
        <Route path={paths.WORKOUT} element={<WorkoutPage />} />
        <Route path={paths.WORKOUT_SELECT + '/:courseId'} element={<WorkoutSelectPage />} />
        <Route path={paths.PROFILE} element={<ProfilePage />} />
        <Route path={paths.PROGRESS} element={<ProgressPage />} />
        <Route path={paths.PROGRESSDONE} element={<ProgressDonePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;