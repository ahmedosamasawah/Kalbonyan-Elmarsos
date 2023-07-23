import "./index.css";
import "normalize.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./context/appContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
