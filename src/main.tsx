import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.css";
import App from "./components/App";
import AppProvider from "./contexts/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
