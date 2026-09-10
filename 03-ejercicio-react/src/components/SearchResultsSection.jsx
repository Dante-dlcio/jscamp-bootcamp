import { JobListings } from "./JobListings";
import { Pagination } from "./Pagination";

export function SearchResultSection({ jobs, currentPage, onPageChange }) {
  return (
    <>
      <section>
        <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>
        <JobListings jobs={jobs} />
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={onPageChange}
        />
      </section>
    </>
  );
}
