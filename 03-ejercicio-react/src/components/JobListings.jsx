import { JobCard } from "./JobCard";

export function JobListings({ jobs }) {
  return (
    <div className="jobs-listings">
      {/* Renderizamos el mensaje dentro de un <p> para que sea un párrafo real, con semántica y estilos */}
      {jobs.length === 0 && (
        <p>
          No se han encontrado empleos que coincidan con los criterios de
          búsqueda
        </p>
      )}

      {/*
      {jobs.length === 0
        ? "No se han encontrado empleos que coincidan con los criterios de búsqueda"
        : jobs.map((job) => {
            return <JobCard key={job.id} job={job} />;
          })}
      */}

      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
