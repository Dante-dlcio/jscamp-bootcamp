import { JobCard } from "./JobCard";

export function JobListings({ jobs }) {
  return (
    <div className="jobs-listings">
      {jobs.length === 0
        ? "No se han encontrado empleos que coincidan con los criterios de búsqueda"
        : jobs.map((job) => {
            return <JobCard key={job.id} job={job} />;
          })}
    </div>
  );
}
