export function Pagination({
  currentPage,
  totalPages,
  onPageChange = { onPageChange },
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const styleLinkLeft = {
    opacity: currentPage === 1 ? 0.3 : 1,
    cursor: currentPage === 1 ? "not-allowed" : "pointer",
  };
  const styleLinkRight = {
    opacity: currentPage === totalPages ? 0.3 : 1,
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
  return (
    <nav className="pagination">
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
    </nav>
  );
}
