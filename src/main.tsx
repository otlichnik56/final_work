import './index.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./AppRoutes.tsx";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
