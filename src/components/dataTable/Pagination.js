import React from "react";

const Pagination = ({ cardsPerPage, totalCards, paginate }) => {
  let { pN } = useParams()
  console.log(pN)
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  function pageNum(number){
    paginate(number)
    sessionStorage.setItem("pageNumber",number)
  }
     
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => pageNum(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
