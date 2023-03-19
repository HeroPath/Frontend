import { useState } from "react";
import "./pagination.css";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [currentPageState, setCurrentPageState] = useState(currentPage);

  const handlePageChange = (page) => {
    setCurrentPageState(page);
    onPageChange(page);
  };

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => handlePageChange(i)} className="buttonPagination">
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
