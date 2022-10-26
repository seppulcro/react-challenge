import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import Filters from "./Filters/Filters";
import MovieModal from "./Modal/Modal";
import MoviesTable from "./Table/Table";

const MOVIES_PER_PAGE = 25;

const MovieRankings = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(null);

  const fetchMovies = (params, reset = false) => {
    return axios
      .get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies`, {
        params: params || {
          page: reset === true ? 1 : currentPage,
          size: MOVIES_PER_PAGE,
        },
      })
      .then(({ data: { content } }) => {
        setMovies((movies) => {
          if (reset === true) return [...content];
          return params
            ? [...content].sort((a, b) => b.revenue - a.revenue)
            : [...movies, ...content];
        });
        if (reset === true) setCurrentPage(1);
        else setCurrentPage(currentPage + 1);
      });
  };
  useEffect(() => {
    if (movies.length <= 0) fetchMovies();
  }, []);
  console.log(filter);
  return (
    <Container className="mt-5">
      <StyledTitle>Movie Rankings</StyledTitle>
      <MovieModal
        {...{ showModal }}
        {...{ setShowModal }}
        {...{ fetchMovies }}
        {...{ setFilter }}
      />
      <Filters {...{ fetchMovies }} {...{ filter }} {...{ setFilter }} />
      <MoviesTable
        className="mt-5"
        {...{ setShowModal }}
        {...{ movies }}
        {...{ fetchMovies }}
        {...{ filter }}
      />
    </Container>
  );
};

const StyledTitle = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 32px;
  color: ${(props) => props.theme.colors.title};
`;

export default MovieRankings;
