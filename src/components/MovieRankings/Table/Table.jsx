import React, { useEffect, useRef, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import styled from "styled-components";
const SCROLL_THRESHOLD = 150;

const MoviesTable = ({
  movies,
  className,
  setShowModal,
  fetchMovies,
  filter,
}) => {
  const containerRef = useRef(null);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const { current } = containerRef;
    if (current) {
      current.addEventListener("scroll", scrollHandler);
      return () => {
        current.removeEventListener("scroll", scrollHandler);
      };
    }
  });

  const scrollHandler = ({ target: { scrollTop, scrollTopMax } }) => {
    if (!loading && filter === null)
      if (scrollTopMax - scrollTop <= SCROLL_THRESHOLD) {
        isLoading(true);
        fetchMovies().then(() => {
          isLoading(false);
        });
      }
  };

  return (
    <TableContainer ref={containerRef} {...{ className }}>
      <StyledTable responsive>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Title</th>
            <th>Year</th>
            <th>Revenue</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies &&
            movies.length >= 0 &&
            movies.map(({ id, title, year, rank, revenue }, i) => (
              <tr key={`movies-table-entry-${i}`}>
                <td>{i + 1}</td>
                <td>{title}</td>
                <td>{year}</td>
                <td>{revenue ? `$${revenue}M` : "N/A"}</td>
                <td>
                  <i
                    className="bi bi-eye-fill"
                    onClick={() => setShowModal(id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </StyledTable>

      {isLoading === true && (
        <div className="d-flex flex-row justify-content-center">
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        </div>
      )}
    </TableContainer>
  );
};

const TableContainer = styled.div`
  max-height: 65vh;
  overflow-y: scroll;
`;

const StyledTable = styled(Table)`
  color: ${(props) => props.theme.colors.tableFont};
  thead {
    color: ${(props) => props.theme.colors.tableHead};
    border-color: ${(props) => props.theme.colors.tableHead};
    text-transform: uppercase;
    font-size: 10px;
  }
  tbody {
    font-size: 16px;
    color: ${(props) => props.theme.colors.tableFont};
    tr {
      border-color: ${(props) => props.theme.colors.tableRowBorder};
    }
    td i:hover {
      cursor: pointer;
      color: ${(props) => props.theme.colors.tableRowBorder} !important;
    }
  }
`;

export default MoviesTable;
