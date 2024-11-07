import "./input.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./AppRoutes.tsx";
import UserProvider from "./context/UserContext.tsx";
import CoursesProvider from './context/CoursesContext'; // Импорт провайдера контекста
import WorkoutsProvider from './context/WorkoutsContext'; // Импорт провайдера контекста

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <CoursesProvider>
        <WorkoutsProvider>

          <App />

        </WorkoutsProvider>
        </CoursesProvider>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
