import { Routes, Route } from "react-router-dom";
import { paths } from "./lib/paths";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPage from "./pages/ResetPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import HomePage from "./pages/HomePage/HomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.LOGIN} element={<LoginPage />} />
      <Route path={paths.REGISTER} element={<RegisterPage />} />
      <Route path={paths.RESET} element={<ResetPage />} />
      <Route path={paths.NEWPASSWORD} element={<NewPasswordPage />} />
      <Route path={paths.HOME} element={<HomePage />} />
      <Route path={paths.COURSE} element={<CoursesPage />} />
    </Routes>
  );
};

export default AppRoutes;
