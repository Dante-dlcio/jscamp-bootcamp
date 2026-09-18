import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";
import { Link } from "./Link";

export function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  // Lo que hiciste no está mal, esto es una alternativa: obtenemos el booleano en el selector para que Zustand detecte el cambio sin llamar funciones
  const jobIsFavorite = useFavoritesStore((state) =>
    state.favorites.includes(job.id),
  );

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
