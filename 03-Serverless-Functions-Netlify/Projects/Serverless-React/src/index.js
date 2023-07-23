import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import Product from "./Product";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const rootElement = document.getElementById("root");

const app = (
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:productID" element={<Product />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

if (rootElement?.hasChildNodes()) {
  // If the root element already has children, use createRoot to hydrate
  ReactDOM.createRoot(rootElement).render(app);
} else {
  // If the root element is empty, use createRoot to render
  ReactDOM.createRoot(rootElement).render(app);
}
