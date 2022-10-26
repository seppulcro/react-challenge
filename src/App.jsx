import { useState } from "react";
import styled from "styled-components";
import MovieRankings from "./components/MovieRankings/MovieRankings";
import Navbar from "./components/Navbar/Navbar";
import "@fontsource/roboto";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <>
      <Navbar />
      <MovieRankings />
    </>
  );
}

export default styled(App)`
  font-family: "Roboto";
`;
