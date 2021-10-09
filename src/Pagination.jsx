import React from 'react';

const paginationStyle = {
  fontSize: '2rem',
  textAlign: 'center',
  marginTop: '1rem'
}

const pageNumStyle = {
  cursor: 'pointer',
  marginTop: '1rem',
  marginRight: '.8rem'
}

function Pagination({
  currentPage,
  pagecChange,
}) {
  return (
    <div style={paginationStyle}>
      {currentPage > 4 ? (
        <>
          <span
            onClick={() => pagecChange(1)}
            style={{ ...(currentPage === 1 ? { textDecoration: 'underline' } : {}), ...pageNumStyle }}
          >
            1
          </span>
          <span style={pageNumStyle}>...</span>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <span
                key={index + currentPage - 2}
                onClick={() => pagecChange(index + currentPage - 2)}
                style={
                  {
                    ...(currentPage === index + currentPage - 2
                      ? { textDecoration: 'underline' }
                      : {}), ...pageNumStyle
                  }
                }
              >
                {index + currentPage - 2}
              </span>
            ))}
        </>
      ) : (
        Array(5)
          .fill(null)
          .map((_, index) => (
            <span
              key={index + 1}
              onClick={() => pagecChange(index + 1)}
              style={{
                ...pageNumStyle,
                ...(currentPage === index + 1 ? { textDecoration: 'underline' } : {})
              }
              }
            >
              {index + 1}
            </span>
          ))
      )}
    </div>
  );
}

export default Pagination;
