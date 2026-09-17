/* Pasa tu contenido de src/App.jsx aquí */
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SearchFormSection } from "../components/SearchFormSection";
import { SearchResultSection } from "../components/SearchResultsSection";
import jobs from "../data.json";
const RESULTS_PER_PAGE = 5;

/* Agrupamos las etiquetas equivalentes del data.json por cada opción del select (los datos usan "mid" y "mid-level" para el mismo nivel) */
const LEVEL_MATCHES = {
  junior: ["junior"],
  mid: ["mid", "mid-level"],
  senior: ["senior"],
  lead: ["lead"],
};

export function Search() {
  const initialParams = new URLSearchParams(window.location.search);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => setCurrentPage(page);
  const [filters, setFilters] = useState({
    technology: initialParams.get("technology") ?? "",
    location: initialParams.get("type") ?? "",
    experienceLevel: initialParams.get("level") ?? "",
    searchText: initialParams.get("text") ?? "",
  });
  const [debouncedSearchText, setDebouncedSearchText] = useState(
    filters.searchText,
  );
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedSearchText(filters.searchText);
    }, 300);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [filters.searchText]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchText !== "") {
      params.set("text", debouncedSearchText);
    }
    if (filters.technology !== "") {
      params.set("technology", filters.technology);
    }
    if (filters.location !== "") {
      params.set("type", filters.location);
    }
    if (filters.experienceLevel !== "") {
      params.set("level", filters.experienceLevel);
    }
    const queryString = params.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }, [
    debouncedSearchText,
    filters.technology,
    filters.location,
    filters.experienceLevel,
  ]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };
  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.technology === "" ||
        job.data.technology === filters.technology) &&
      (filters.location === "" || job.data.modalidad === filters.location) &&
    /*
    (filters.experienceLevel === "" ||
      job.data.nivel === filters.experienceLevel ||
      (filters.experienceLevel === "mid" &&
        job.data.nivel === "mid-level")) &&
    */
    (filters.experienceLevel === "" ||
      LEVEL_MATCHES[filters.experienceLevel]?.includes(job.data.nivel)) &&
      (debouncedSearchText === "" ||
        job.titulo.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
        job.empresa.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
        job.descripcion
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        job.ubicacion
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        job.data.technology
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()))
    );
  });
  const totalPages = Math.ceil(filteredJobs.length / RESULTS_PER_PAGE);
  const startI = (currentPage - 1) * RESULTS_PER_PAGE;
  const endI = startI + RESULTS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startI, endI);
  return (
    <>
      <Header />

      <main>
        <SearchFormSection
          onFiltersChange={handleFiltersChange}
          filters={filters}
        />
        <SearchResultSection
          jobs={paginatedJobs}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </main>
      <Footer />
    </>
  );
}
