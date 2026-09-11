export function SearchFormSection({ onFiltersChange, filters }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <section className="jobs-search">
        <h1>Encuentra tu próximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnológico.</p>

        <form id="empleos-search-form" role="search" onSubmit={handleSubmit}>
          <div className="search-bar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>

            <input
              id="empleos-search-input"
              type="text"
              name="search-value"
              placeholder="Buscar trabajos, empresas o habilidades"
              value={filters.searchText}
              onChange={(event) => {
                const inputText = {
                  ...filters,
                  searchText: event.target.value,
                };
                onFiltersChange(inputText);
              }}
            />
          </div>

          <div className="search-filters">
            <select
              value={filters.technology}
              onChange={(event) => {
                const updatedFilters = {
                  ...filters,
                  technology: event.target.value,
                };
                onFiltersChange(updatedFilters);
              }}
              name="technology-value"
              id="filter-technology"
            >
              <option value="">Tecnología</option>
              <optgroup label="Tecnologías populares">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="react">React</option>
                <option value="node">Node.js</option>
                <option value="mobile">Mobile</option>
              </optgroup>
              <option value="java">Java</option>
              <hr />
              <option value="csharp">C#</option>
              <option value="c">C</option>
              <option value="c++">C++</option>
              <hr />
              <option value="ruby">Ruby</option>
              <option value="php">PHP</option>
            </select>

            <select
              name="location-value"
              id="filter-location"
              value={filters.location}
              onChange={(event) => {
                const updatedFilters = {
                  ...filters,
                  location: event.target.value,
                };
                onFiltersChange(updatedFilters);
              }}
            >
              <option value="">Ubicación</option>
              <option value="remoto">Remoto</option>
              <option value="cdmx">Ciudad de México</option>
              <option value="guadalajara">Guadalajara</option>
              <option value="monterrey">Monterrey</option>
              <option value="barcelona">Barcelona</option>
            </select>

            <select
              name="experience-level-value"
              id="filter-experience-level"
              value={filters.experienceLevel}
              onChange={(event) => {
                const updatedFilters = {
                  ...filters,
                  experienceLevel: event.target.value,
                };
                onFiltersChange(updatedFilters);
              }}
            >
              <option value="">Nivel de experiencia</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
            </select>
          </div>
        </form>

        <span id="filter-selected-value"></span>
      </section>
    </>
  );
}
