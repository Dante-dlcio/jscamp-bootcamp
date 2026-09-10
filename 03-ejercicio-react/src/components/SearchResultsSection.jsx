import { JobListings } from "./JobListings";
import { Pagination } from "./Pagination";

export function SearchResultSection({
  jobs,
  currentPage,
  onPageChange,
  totalPages,
}) {
  return (
    <>
      <section>
        <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>
        <JobListings jobs={jobs} />
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </section>
    </>
  );
}
