import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeToggleProvider from "./utils/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeToggleProvider>
      <App />
    </ThemeToggleProvider>
  </StrictMode>
);
