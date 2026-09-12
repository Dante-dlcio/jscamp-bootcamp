import { useParams } from "react-router";
import { useState, useEffect } from "react";
import snarkdown from "snarkdown";

export function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          <a href="/search">Empleos</a>
          <span>/</span>
          <span>{job.titulo}</span>
        </nav>
        <header className="job-detail-header">
          <h1>{job.titulo}</h1>
          <small>
            {job.empresa}·{job.ubicacion}
          </small>
          <button>Aplicar a esta oferta</button>
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
