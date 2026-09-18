import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { JobListings } from "../components/JobListings.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";

const RESULTS_PER_PAGE = 4;

/*
const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => {
    return {
      technology: searchParams.get("technology") || "",
      location: searchParams.get("type") || "",
      experienceLevel: searchParams.get("level") || "",
    };
  });
  const [textToFilter, setTextToFilter] = useState(() => {
    return searchParams.get("text") || "";
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get("page"));
    return Number.isNaN(page) || page < 1 ? 1 : page;
  });

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (textToFilter) params.set("text", textToFilter);
        if (filters.technology) params.set("technology", filters.technology);
        if (filters.location) params.set("type", filters.location);
        if (filters.experienceLevel)
          params.set("level", filters.experienceLevel);

        const offset = (currentPage - 1) * RESULTS_PER_PAGE;
        params.set("limit", RESULTS_PER_PAGE);
        params.set("offset", offset);

        const queryParams = params.toString();

        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`,
        );
        const json = await response.json();

        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [filters, currentPage, textToFilter]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (textToFilter) params.set("text", textToFilter);
    if (filters.technology) params.set("technology", filters.technology);
    if (filters.location) params.set("type", filters.location);
    if (filters.experienceLevel) params.set("level", filters.experienceLevel);

    if (currentPage > 1) params.set("page", currentPage);
    setSearchParams(params);
  }, [filters, currentPage, textToFilter, setSearchParams]);

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (filters) => {
    setFilters(filters);
    setCurrentPage(1);
  };

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter);
    setCurrentPage(1);
  };

  return {
    loading,
    jobs,
    total,
    totalPages,
    currentPage,
    textToFilter,
    filters,
    handlePageChange,
    handleSearch,
    handleTextFilter,
  };
};
*/

// Comentamos el hook anterior para plantearte esta alternativa:
// La URL es la única fuente de verdad: el estado tiene que depender de lo que haya en searchParams, de esta manera no hay contradicciones en lo que hay en la URL y en los estados iniciales
const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const textToFilter = searchParams.get("text") || "";
  const filters = {
    technology: searchParams.get("technology") || "",
    location: searchParams.get("type") || "",
    experienceLevel: searchParams.get("level") || "",
  };
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        // Reutilizamos los params de la URL y solo añadimos la paginación
        const params = new URLSearchParams(searchParams);
        params.set("limit", RESULTS_PER_PAGE);
        params.set("offset", (currentPage - 1) * RESULTS_PER_PAGE);

        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${params}`,
        );
        const json = await response.json();

        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [searchParams, currentPage]);

  // Actualizamos la URL directamente en el handler, el estado derivado se actualiza solo
  const updateParams = (updates) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      for (const [key, value] of Object.entries(updates)) {
        value ? params.set(key, value) : params.delete(key);
      }
      return params;
    });
  };

  const handlePageChange = (page) => {
    updateParams({ page: page > 1 ? page : "" });
  };

  const handleSearch = (newFilters) => {
    updateParams({
      technology: newFilters.technology,
      type: newFilters.location,
      level: newFilters.experienceLevel,
      page: "", // al filtrar volvemos a la primera página
    });
  };

  const handleTextFilter = (newTextToFilter) => {
    updateParams({ text: newTextToFilter, page: "" });
  };

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

  return {
    loading,
    jobs,
    total,
    totalPages,
    currentPage,
    textToFilter,
    filters,
    handlePageChange,
    handleSearch,
    handleTextFilter,
  };
};

export default function SearchPage() {
  const {
    jobs,
    total,
    loading,
    totalPages,
    currentPage,
    textToFilter,
    filters,
    handlePageChange,
    handleSearch,
    handleTextFilter,
  } = useFilters();

  const title = loading
    ? `Cargando... - DevJobs`
    : `Resultados: ${total}, Página ${currentPage} - DevJobs`;

  return (
    <main>
      <title>{title}</title>
      <meta
        name="description"
        content="Explora miles de oportunidades laborales en el sector tecnológico. Encuentra tu próximo empleo en DevJobs."
      />

      <SearchFormSection
        initialText={textToFilter}
        initialFilters={filters}
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
      />

      <section>
        <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>

        {loading ? <p>Cargando empleos...</p> : <JobListings jobs={jobs} />}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}
