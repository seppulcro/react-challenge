import React from "react";
import { render, screen, fireEvent } from "../../../../test-utils";
import MoviesTable from "./Table";
const movies = new Array(20).fill({
  id: "A",
  title: "TitleXPTO",
  year: "222",
  rank: "0",
  revenue: "45",
});
describe("Table Component", () => {
  test("should render", () => {
    render(<MoviesTable />);
    expect(screen.getByText("Ranking")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });

  test("should render with data", () => {
    render(<MoviesTable {...{ movies }} />);
    expect(screen.getAllByText("TitleXPTO")[0]).toBeInTheDocument();
  });

  test("should be loading", () => {
    render(<MoviesTable defaultLoading={"true"} />);
  });

  test("should open modal on view more icon click ", () => {
    const setShowModal = jest.fn();
    movies[0].revenue = null;
    render(<MoviesTable {...{ movies }} {...{ setShowModal }} />);
    expect(screen.getByTestId("view-details-icon-5")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("view-details-icon-5"));
    expect(setShowModal).toHaveBeenCalled();
  });

  test("Should try to fetchMore on scroll end", () => {
    const fakeFetchTrigger = jest.fn(() => Promise.resolve().catch());

    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      get: function () {
        return this._scrollHeight || 0;
      },
      set(val) {
        this._scrollHeight = val;
      },
    });
    render(
      <MoviesTable
        {...{ movies }}
        fetchMovies={fakeFetchTrigger}
        filter={null}
      />
    );
    const scrollableContainer = screen.getByTestId("scrollable-table");
    fireEvent.scroll(scrollableContainer, {
      target: { scrollTop: 1707, scrollHeight: 2098 },
    });
    expect(fakeFetchTrigger).toHaveBeenCalled();
  });
});
