import { useState } from "react";
import { Header } from "./components/Header";
import { SearchFormSection } from "./components/SearchFormSection";
import { SearchResultSection } from "./components/SearchResultsSection";
import { Footer } from "./components/Footer";
import jobs from "./data.json";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => setCurrentPage(page);
  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    experienceLevel: "",
  });
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };
  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.technology === "" ||
        job.data.technology === filters.technology) &&
      (filters.location === "" || job.data.modalidad === filters.location) &&
      (filters.experienceLevel === "" ||
        job.data.nivel === filters.experienceLevel ||
        (filters.experienceLevel === "mid" && job.data.nivel === "mid-level"))
    );
  });
  return (
    <>
      <Header />

      <main>
        <SearchFormSection
          onFiltersChange={handleFiltersChange}
          filters={filters}
        />
        <SearchResultSection
          jobs={filteredJobs}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
