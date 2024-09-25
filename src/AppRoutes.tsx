import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CoursesPage from "./pages/CoursesPage/CoursesPage.tsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course" element={<CoursesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
