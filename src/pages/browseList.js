import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/apis.services';
import { useNavigate } from 'react-router';

const BrowseList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const navigateData = useNavigate();

  useEffect(() => {
    getProducts()
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleClick = (data) => {
    navigateData("/itemdetails", { state: data });
  };

  // Calculate pagination variables
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='list1'>
      {products.length === 0 ?
        <h2>Loading...</h2> :
        <>
          <ul className='products11'>
            {currentItems.map((item, itemIndex) => (
              <li key={itemIndex} className='products21'>
                <div className='products12'>
                  <img className='imagedata1' alt='' src={item.image} />
                  <h4>{item.title}</h4>
                  <h3>{item.price}</h3>
                  <button onClick={() => handleClick(item.id)}>Details</button>
                </div>
              </li>
            ))}
          </ul>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={products.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      }
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map(number => (
        <li key={number}>
          <button
            className={currentPage === number ? "active" : ""}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BrowseList;