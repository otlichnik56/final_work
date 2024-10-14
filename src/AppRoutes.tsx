import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { paths } from "./lib/paths";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPage from "./pages/ResetPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import WorkoutPage from "./pages/WorkoutPage/WorkoutPage";
import { CourseType } from "./types/courses";
import { getCourses } from "./api/apiCourse";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProgressPage from "./pages/ProgressPage";
import ProgressDonePage from "./pages/ProgressDonePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import HomePage from "./pages/HomePage/HomePage";


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
      <Route path={paths.HOME} element={<HomePage courses={courses} />}>
        <Route path={paths.LOGIN} element={<LoginPage />} />
      </Route>

      <Route path={paths.HOME} element={<HomePage courses={courses} />}>
        <Route path={paths.REGISTER} element={<RegisterPage />} />
      </Route>

      <Route path={paths.COURSE} element={<CoursesPage courses={courses} />} />
      {/* <Route path={paths.LOGIN} element={<LoginPage />} />
      </Route>

      <Route path={paths.COURSE} element={<CoursesPage courses={courses} />}>
        <Route path={paths.REGISTER} element={<RegisterPage />} />
      </Route> */}

      <Route path={paths.RESET} element={<ResetPage />} />
      <Route path={paths.NEWPASSWORD} element={<NewPasswordPage />} />

      <Route element={<PrivateRoute />}>
        <Route path={paths.WORKOUT} element={<WorkoutPage />} />
        <Route path={paths.PROFILE} element={<ProfilePage />} />
        <Route path={paths.PROGRESS} element={<ProgressPage />} />
        <Route path={paths.PROGRESSDONE} element={<ProgressDonePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
