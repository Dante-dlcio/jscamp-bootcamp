import jobs from "../data.json";
import { JobListings } from "./JobListings";

export function SearchResultSection() {
  return (
    <>
      <section>
        <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>
        <JobListings jobs={jobs} />
        <nav className="pagination">
          <a href="#">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 6l-6 6l6 6" />
            </svg>
          </a>
          <a data-page="1" href="#">
            1
          </a>
          <a data-page="2" href="#">
            2
          </a>
          <a data-page="3" href="#">
            3
          </a>
          <a data-page="4" href="#">
            4
          </a>
          <a data-page="5" href="#">
            5
          </a>
          <a href="#">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 6l6 6l-6 6" />
            </svg>
          </a>
        </nav>
      </section>
    </>
  );
}
