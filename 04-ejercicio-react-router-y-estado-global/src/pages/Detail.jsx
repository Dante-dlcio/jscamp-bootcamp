import { useEffect, useState } from "react";
import { useParams } from "react-router";
import snarkdown from "snarkdown";
import { Link } from "../components/Link";
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";

export default function JobDetail() {
  const { id } = useParams();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  // hacemos lo mismo
  const jobIsFavorite = useFavoritesStore((state) =>
    state.favorites.includes(id),
  );
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    fetch(`https://jscamp-api.vercel.app/api/jobs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Empleo no encontrado");
        }
        return res.json();
      })
      .then((data) => {
        setJob(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <div className="job-detail">
        <nav>
          {/* Usamos Link para navegar sin recargar toda la página. Faltó acá */}
          <Link href="/search">Empleos</Link>
          <span>/</span>
          <span>{job.titulo}</span>
        </nav>
        <header className="job-detail-header">
          <h1>{job.titulo}</h1>
          <small>
            {job.empresa}·{job.ubicacion}
          </small>
          <div className="job-detail-actions">
            {isLoggedIn && (
              <button type="button" onClick={() => toggleFavorite(job.id)}>
                {jobIsFavorite ? "❤️" : "🤍"}
              </button>
            )}
            {isLoggedIn && (
              <button type="button" onClick={() => setIsApplied(true)}>
                {isApplied ? "Aplicado" : "Aplicar"}
              </button>
            )}
          </div>
        </header>
        <div className="prose">
          <h2>Descripción del puesto</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: snarkdown(job.content.description),
            }}
          />
          <h2>Responsabilidades</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: snarkdown(job.content.responsibilities),
            }}
          />
          <h2>Requisitos</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: snarkdown(job.content.requirements),
            }}
          />
          <h2>Acerca de la empresa</h2>
          <div
            dangerouslySetInnerHTML={{ __html: snarkdown(job.content.about) }}
          />
        </div>
        <footer className="job-detail-footer">
          <button>Aplicar ahora</button>
        </footer>
      </div>
    </>
  );
}
