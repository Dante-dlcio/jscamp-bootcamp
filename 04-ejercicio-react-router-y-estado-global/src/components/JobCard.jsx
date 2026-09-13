import { useState } from "react";
import { Link } from "./Link";
import { useFavoritesStore } from "../store/favoritesStore";
import { useAuthStore } from "../store/authStore";

export function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const jobIsFavorite = useFavoritesStore((state) => state.isFavorite(job.id));

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  const buttonClasses = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";
  const buttonText = isApplied ? "Aplicado" : "Aplicar";

  return (
    <article
      className="job-listing-card"
      data-modalidad={job.data.modalidad}
      data-nivel={job.data.nivel}
      data-technology={job.data.technology}
    >
      <div>
        <Link
          href={`/job/${job.id}`}
          aria-label={`Ver detalles de ${job.titulo} en ${job.empresa}`}
        >
          <h3>{job.titulo}</h3>
        </Link>
        <small>
          {job.empresa} | {job.ubicacion}
        </small>
        <p>{job.descripcion}</p>
      </div>
      {isLoggedIn && (
        <button
          type="button"
          className={buttonClasses}
          onClick={handleApplyClick}
        >
          {buttonText}
        </button>
      )}
      {isLoggedIn && (
        <button
          type="button"
          onClick={() => {
            toggleFavorite(job.id);
          }}
        >
          {jobIsFavorite ? "❤️" : "🤍"}
        </button>
      )}
    </article>
  );
}
