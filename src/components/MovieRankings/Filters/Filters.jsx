import React from "react";
import { useState } from "react";
import { Badge, Form } from "react-bootstrap";
import styled from "styled-components";
const START_YEAR = 2016;
const END_YEAR = 2000;

const Filters = ({ filter, setFilter, fetchMovies }) => {
  const [year, setYear] = useState(null);

  const handleSetFilter = (index, year) => {
    let params = {
      page: 1,
      size: 10,
      start: 1500,
      end: 2500,
    };
    if (year) {
      params.start = year;
      params.end = year;
    }
    fetchMovies(params).then(setFilter(index));
  };

  const handleYearSelect = (year) => {
    setYear(year);
    handleSetFilter(1, year);
  };

  return (
    <StyledFilters>
      <StyledPill
        bg="light"
        text="dark"
        onClick={() => handleSetFilter(0)}
        filtered={filter === 0 ? "true" : undefined}
      >
        Top 10 Revenue
      </StyledPill>
      <StyledPill
        bg="light"
        text="dark"
        onClick={() => setFilter(filter === null ? 1 : null)}
        filtered={filter === 1 ? "true" : undefined}
      >
        Top 10 Revenue per Year
      </StyledPill>
      {filter === 1 && (
        <StyledSelect
          aria-label="Select a year"
          onChange={(e) => handleYearSelect(e.target.value)}
        >
          {Array.from(
            { length: START_YEAR - END_YEAR + 1 },
            (v, k) => START_YEAR - k
          ).map((year, i) => {
            return (
              <option value={year} key={`year-option-${i}`}>
                {year}
              </option>
            );
          })}
        </StyledSelect>
      )}
      {filter !== null && (
        <StyledIcon
          className="bi bi-arrow-counterclockwise"
          onClick={() => {
            setFilter(null);
            fetchMovies(null, true);
          }}
        />
      )}
    </StyledFilters>
  );
};

const StyledFilters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  * {
    margin-right: 15px;
  }
  @media (max-width: 1200px) {
    flex-direction: column;
    * {
      margin-top: 10px;
      max-width: 100% !important;
    }
  }
`;

const StyledPill = styled(Badge)`
  border: 1px solid #78849e66;
  border-radius: 20px;
  padding: 8px 12px;
  background-color: ${(props) =>
    props.filtered === "true"
      ? props.theme.colors.link
      : props.theme.colors.white} !important;

  &:hover {
    background-color: ${(props) => props.theme.colors.link} !important;
    cursor: pointer;
  }
`;

const StyledIcon = styled.i`
  &:hover {
    cursor: pointer;
  }
`;

const StyledSelect = styled(Form.Select)`
  max-width: 200px;
  display: inline-block;
`;

export default Filters;
