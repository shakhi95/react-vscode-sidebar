import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./styles/main.css";
import AppProvider from "./contexts/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);