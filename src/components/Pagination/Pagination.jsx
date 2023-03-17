import { useState } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [currentPageState, setCurrentPageState] = useState(currentPage);

  const handlePageChange = (page) => {
    setCurrentPageState(page);
    onPageChange(page);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

    }}>
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => handlePageChange(i)} style={{          
          backgroundColor: "black",
          color: "white",
          border: "2px solid grey",
          marginBottom: "10px",
        }}>
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
