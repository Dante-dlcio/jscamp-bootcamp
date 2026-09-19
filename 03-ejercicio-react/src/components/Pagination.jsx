export function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  /*
  const styleLinkLeft = {
    opacity: currentPage === 1 ? 0.3 : 1,
    cursor: currentPage === 1 ? "not-allowed" : "pointer",
  };
  const styleLinkRight = {
    opacity: currentPage === 1 ? 0.3 : 1,
    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
  };
  const handlePageClick = (event, page) => {
    event.preventDefault();
    onPageChange(page);
  };
  const handlePrevious = (event) => {
    event.preventDefault();
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNext = (event) => {
    event.preventDefault();
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  */
  return (
    <nav className="pagination">
      {/*
      <a href="#" style={styleLinkLeft} onClick={(e) => handlePrevious(e)}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </a>
      {pages.map((page) => (
        <a
          onClick={(e) => handlePageClick(e, page)}
          className={currentPage === page ? "is-active" : ""}
          key={page}
          data-page={page}
          href="#"
        >
          {page}
        </a>
      ))}
      <a href="#" style={styleLinkRight} onClick={(e) => handleNext(e)}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </a>
      */}

      {/* Usamos <button disabled> para deshabilitar de verdad: el atributo bloquea el clic y reutiliza el estilo :disabled del CSS. Lo mejor cuando queremos elementos clickeables es un clic, cuando queremos navegar usaremos anchor. Esto en otras prácticas lo podemos ver bien usando anchor, pero en este caso que vamos a necesitar status disabled y otro control más, button es la mejor opción */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </button>

      {pages.map((page) => (
        /* is-active es la clase del CSS que destaca la página actual con otro color */
        <button
          key={page}
          className={currentPage === page ? "is-active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </button>
    </nav>
  );
}
