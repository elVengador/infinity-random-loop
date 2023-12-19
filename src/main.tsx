import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { ThemeProvider } from "styled-components";
import { myTheme } from "./theme.js";
import { ConfigProvider } from "./context/config.context.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider>
      <ThemeProvider theme={myTheme}>
        <App />
      </ThemeProvider>
    </ConfigProvider>
  </React.StrictMode>
);
