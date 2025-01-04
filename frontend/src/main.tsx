import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "reset-css/reset.css";
import "pollen-css/pollen.css";

import "./index.css";

import App from "./App.tsx";

import "@fontsource-variable/roboto-flex/standard.css";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
