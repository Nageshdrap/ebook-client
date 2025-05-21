import React from 'react';

const Pagination = ({ totalPage, page, setPage }) => {
  const maxVisiblePages = 4; // Show at most 4 page numbers

  const getVisiblePages = () => {
    if (totalPage <= maxVisiblePages) {
      return [...Array(totalPage)].map((_, i) => i + 1);
    }

    const start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPage, start + maxVisiblePages - 1);
    const actualStart = Math.max(1, end - maxVisiblePages + 1);

    return Array.from({ length: end - actualStart + 1 }, (_, i) => actualStart + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav aria-label="Pagination" className="mt-3">
      <ul className="pagination justify-content-center flex-wrap">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`} style={{ cursor: 'pointer' }}>
          <a className="page-link" onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</a>
        </li>

        {visiblePages[0] > 1 && (
          <>
            <li className="page-item"><button className="page-link" onClick={() => setPage(1)}>1</button></li>
            <li className="page-item disabled"><span className="page-link">...</span></li>
          </>
        )}

        {visiblePages.map((p) => (
          <li key={p} className={`page-item ${page === p ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
            <a className="page-link" onClick={() => setPage(p)}>{p}</a>
          </li>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPage && (
          <>
            <li className="page-item disabled"><span className="page-link">...</span></li>
            <li className="page-item"><a className="page-link" onClick={() => setPage(totalPage)}>{totalPage}</a></li>
          </>
        )}

        <li className={`page-item ${page === totalPage ? 'disabled' : ''}`} style={{ cursor: 'pointer' }}>
          <a className="page-link" onClick={() => setPage(page + 1)} disabled={page === totalPage}>Next</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
