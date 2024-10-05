import { Routes, Route } from "react-router-dom";
import { Paths } from "../../lib/appRoutes";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ResetPage from "../../pages/ResetPage";
import Main from "../Main/Main";
import NewPasswordPage from "../../pages/NewPasswordPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={Paths.LOGIN} element={<LoginPage />} />
      <Route path={Paths.REGISTER} element={<RegisterPage />} />
      <Route path={Paths.RESET} element={<ResetPage />} />
      <Route path={Paths.NEWPASSWORD} element={<NewPasswordPage />} />

      <Route path={Paths.MAIN} element={<Main />}></Route>
    </Routes>
  );
};
