import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner, Stack } from "react-bootstrap";
import styled from "styled-components";

const MovieModal = ({ showModal, setShowModal, fetchMovies, setFilter }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    title,
    year,
    genre,
    description,
    director,
    actors,
    runtime,
    rating,
    votes,
    revenue,
    metascore,
  } = movieDetails || {};
  useEffect(() => {
    setLoading(true);
    if (showModal !== false)
      axios
        .get(
          `http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${showModal}`
        )
        .then(({ data }) => {
          setMovieDetails(data);
          setLoading(false);
        });
  }, [showModal]);

  const handleLinkFilter = (director, actor) => {
    fetchMovies(
      {
        page: 1,
        director: director || undefined,
        actor: actor || undefined,
      },
      true
    );
    setShowModal(false);
    setFilter(true);
  };

  return (
    <StyledModal
      show={showModal !== false}
      size="lg"
      centered
      onHide={() => setShowModal(false)}
    >
      {!movieDetails || loading ? (
        <Spinner />
      ) : (
        <>
          <StyledModalHeader closeButton>
            <StyledModalTitle>{title}</StyledModalTitle>
          </StyledModalHeader>
          <Modal.Body>
            <h6>Year</h6>
            <p>{year}</p>
            <h6>Genre</h6>
            <p>{genre}</p>
            <h6>Description</h6>
            <p>{description}</p>
            <Stack direction="horizontal" gap={3}>
              <div>
                <h6>Director</h6>
                <p>
                  <Button
                    variant="link"
                    onClick={() => {
                      handleLinkFilter(director, null);
                    }}
                  >
                    {director}
                  </Button>
                </p>
              </div>
              <div>
                <h6>Actors</h6>
                <p>
                  {actors.split(",").map((actor, i) => {
                    return (
                      <Button
                        variant="link"
                        key={`actor-link-${i}`}
                        onClick={() => {
                          handleLinkFilter(director, null);
                        }}
                      >
                        {actor}
                      </Button>
                    );
                  })}
                </p>
              </div>
            </Stack>
            <h6>Runtime</h6>
            <p>{runtime}</p>
            <h6>Rating</h6>
            <p>{rating}</p>
            <h6>Votes</h6>
            <p>{votes}</p>
            {revenue && (
              <>
                <h6>Revenue</h6>
                <p>{`$${revenue}M`}</p>
              </>
            )}
            {metascore && (
              <>
                <h6>Metascore</h6>
                <p>{metascore}</p>
              </>
            )}
          </Modal.Body>
        </>
      )}
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  .modal-content {
    padding: 32px;
  }
  h6 {
    font-size: 14px;
    color: ${(props) => props.theme.colors.mutedSmallHeader};
  }
  .btn-link {
    padding: 0 !important;
    margin: 0 15px 0 0 !important;
    color: ${(props) => props.theme.colors.link};
  }
`;

const StyledModalHeader = styled(Modal.Header)`
  border: none;
  &:after {
    content: "";
    background: ${(props) => props.theme.colors.modalBorder};
    content: "";
    background: #21b3cf;
    position: absolute;
    top: 100px;
    width: 52px;
    height: 2px;
  }
  .btn-close {
    color: ${(props) => props.theme.colors.modalTitle};
    content: "X";
  }
  .btn-close:after {
    content: "CLOSE";
    font-size: 8px;
    position: relative;
    right: 5px;
    top: 10px;
    color: ${(props) => props.theme.colors.modalTitle};
  }
`;

const StyledModalTitle = styled(Modal.Title)`
  font-size: 32px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.modalTitle};
`;

export default MovieModal;
