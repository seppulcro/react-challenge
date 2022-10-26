/* eslint-disable import/export */
import { cleanup, render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/main";
import "@testing-library/jest-dom";

const Wrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const customRender = (ui, options) => {
  return render(ui, { wrapper: Wrapper, ...options });
};
// override render export
export * from "@testing-library/react";
export { customRender as render };
