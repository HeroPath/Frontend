import React, { useState } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [currentPageState, setCurrentPageState] = useState(currentPage);

  const handlePageChange = (page) => {
    setCurrentPageState(page);
    onPageChange(page);
  };

  return (
    <div>
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => handlePageChange(i)}>
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
