import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const Pagination = ({ photosPerPage, totalPhotos, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPhotos / photosPerPage); i++) {
    pageNumbers.push(i);
  }

  const navigate = useNavigate();

  

  useEffect(() => {

    navigate(`?page=${currentPage}`);
  }, []);
  return (
    
    <nav>
      {console.log('currentPage----',currentPage)}
      
      <ul className='pagination'>
        {pageNumbers.map(number => (
         
          <li key={number} className= {`page-item ${currentPage == number ? 'active' : ''} `}>
         
            <a onClick={() => 
              paginate(number)
              }  className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
