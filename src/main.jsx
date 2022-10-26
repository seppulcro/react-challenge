import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";

const theme = {
  colors: {
    white: "#FFFFFF",
    tableFont: "#536B7A",
    font: "##78849E",
    link: "#00BAFF",
    darkGray: "#78849E66",
    modalTitle: "#164E78",
    tableHead: "#0B749B",
    tableRowBorder: "#9aaebb",
    mutedSmallHeader: "#78849EB9",
    modalBorder: "#21B3CF",
    title: "#386071",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
