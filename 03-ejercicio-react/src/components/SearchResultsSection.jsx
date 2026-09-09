import { useState } from "react";
import jobs from "../data.json";
import { JobListings } from "./JobListings";
import { Pagination } from "./Pagination";

export function SearchResultSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <section>
        <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>
        <JobListings jobs={jobs} />
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
}
