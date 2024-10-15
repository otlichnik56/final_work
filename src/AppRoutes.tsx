import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPage from "./pages/ResetPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import WorkoutPage from "./pages/WorkoutPage/WorkoutPage";
import WorkoutSelectPage from "./pages/WorkoutSelectPage/WorkoutSelectPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProgressPage from "./pages/ProgressPage";
import ProgressDonePage from "./pages/ProgressDonePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import HomePage from "./pages/HomePage/HomePage";
import { CoursesContext } from "./context/CoursesContext"; // Импорт контекста курсов
import { WorkoutsContext } from "./context/WorkoutsContext"; // Импорт контекста тренировок
import { getCourses, getWorkouts } from "./api/apiCourse"; // Функции для получения курсов и тренировок
import { paths } from "./lib/paths"; // Пути приложения

export const AppRoutes = () => {
  const coursesContext = useContext(CoursesContext);
  const workoutsContext = useContext(WorkoutsContext);

  useEffect(() => {
    const getDataCourses = async () => {
      if (coursesContext) { // Проверка на наличие контекста
        coursesContext.setLoading(true);
        try {
          const res = await getCourses();
          coursesContext.setCourses(res); // Устанавливаем курсы в контекст
        } catch (error) {
          coursesContext.setError("Ошибка при загрузке курсов");
        } finally {
          coursesContext.setLoading(false);
        }
      }
    };
    getDataCourses();
  }, []); // Добавляем зависимость на coursesContext

  useEffect(() => {
    const getDataWorkouts = async () => {
      if (workoutsContext) { // Проверка на наличие контекста
        workoutsContext.setLoading(true);
        try {
          const res = await getWorkouts();
          workoutsContext.setWorkouts(res); // Устанавливаем тренировки в контекст
        } catch (error) {
          workoutsContext.setError("Ошибка при загрузке тренировок");
        } finally {
          workoutsContext.setLoading(false);
        }
      }
    };
    getDataWorkouts();
  }, []); // Добавляем зависимость на workoutsContext

  // Добавляем проверку на загрузку данных
  if (!coursesContext || !workoutsContext) {
    return <div>Loading...</div>; // Отображаем "Загрузка..." пока контексты не будут инициализированы
  }

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
        <Route path={paths.WORKOUT + '/:workoutId'} element={<WorkoutPage />} />
        <Route path={paths.WORKOUT_SELECT + '/:courseId'} element={<WorkoutSelectPage />} />
        <Route path={paths.PROFILE} element={<ProfilePage />} />
        <Route path={paths.PROGRESS} element={<ProgressPage />} />
        <Route path={paths.PROGRESSDONE} element={<ProgressDonePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;