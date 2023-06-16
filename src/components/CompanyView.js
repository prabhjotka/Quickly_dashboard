import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { Link ,NavLink} from 'react-router-dom';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const CompanyView = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const tableRef = useRef(null);
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://api-dev.quicklyinc.com/companies', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
       
        setCompanies(response.data.companies);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompanies();
  }, []);

  const handleSorting = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set the new sort field and order
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIndicator = (field) => {
    if (sortField === field) {
      // Display the sort indicator based on the current sort order
      return sortDirection === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US');
  };

  const handleSearchChange = (event) => {
    const keyword = event.target.value.trimStart();
  

    setSearchKeyword(keyword);
    
    setCurrentPage(1); // Reset to the first page when search keyword changes
  };

  // Apply sorting and filtering to companies
  const filteredCompanies = companies.filter((company) => {

    if (searchKeyword.trim() === '') {
      return true; // Return true if the search keyword is empty
    }


    const {id, primary_email, address_city, address_country, phone ,name} = company;
    const keyword = searchKeyword.toLowerCase();

    return (

      
      id.toString()=== keyword ||
      name?.toLowerCase()===keyword ||
      primary_email?.toLowerCase()===keyword ||
      address_city?.toLowerCase()===keyword ||
      address_country?.toLowerCase()===keyword ||
      phone?.toLowerCase()===keyword
    );
  });

  const sortedCompanies = filteredCompanies.sort((a, b) => {
    if (sortField === 'id') {
      const aValue = a.id;
      const bValue = b.id;
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (sortField === 'primary_email') {
      const aValue = a.primary_email;
      const bValue = b.primary_email;
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      const aValue = new Date(a.createdAt);
      const bValue = new Date(b.createdAt);
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });

  // Calculate pagination
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = sortedCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="mt-3" align="center">
        Companies View
      </h2>
      
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
 <div style={{ marginLeft: '1095px' }}>
                        <NavLink to="/admin"  style={({ isActive }) => ({ 
                            color: isActive ? 'darkcyan' : 'Blue' })}>
                        Back to Admin Page
                        </NavLink>
                    </div>
                    <div className="my-3">
        <input
          type="text"
          placeholder="Search... by company id, primary email, address city, address country, phone,Name"
          className="form-control"
          value={searchKeyword}
          onChange={handleSearchChange}
       
        />
      </div>
          <table className="table table-striped table-hover" ref={tableRef} id= "company-table">
            <thead>
              <tr>
                <th onClick={() => handleSorting('id')}>
                  Company ID{getSortIndicator('id')}
                </th>
               <th onClick={() => handleSorting('name')}>
                  Company Name{getSortIndicator('name')}
                </th>
                <th onClick={() => handleSorting('createdAt')}>
                  Creation Date{getSortIndicator('createdAt')}
                </th>
                <th onClick={() => handleSorting('primary_email')}>
                  Company Email{getSortIndicator('primary_email')}
                </th>
                <th onClick={() => handleSorting('address_city')}>
                  Company Address{getSortIndicator('address_city')}
                </th>
                <th onClick={() => handleSorting('phone')}>
                  Company Phone{getSortIndicator('phone')}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCompanies.map((company) => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                 
                  <td><Link to={`/companydetails/${company.name}`}>{company.name}</Link></td>
                  <td>{formatDate(company.createdAt)}</td>
                  <td>{company.primary_email}</td>
                  <td>
                    {`${company.address_city}, ${company.address_country}`}
                  </td>
                  <td>{company.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
                

                <div className="d-flex justify-content-between">
                  
                <DownloadTableExcel
                    filename="company table"
                    sheet="company"
                    table="company-table"
                    currentTableRef={tableRef.current}>

                   <button className="btn btn-success">Export to Excel </button>

                </DownloadTableExcel>
              
          <Pagination
            companiesPerPage={companiesPerPage}
            totalCompanies={sortedCompanies.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          </div>
        </>
      )}

      
    </div>
  );
};

const Pagination = ({ companiesPerPage, totalCompanies, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalCompanies / companiesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClickPrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleClickNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handleClickPrevious}>
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => {
          const isCurrentPage = number === currentPage;
          return (
            <li
              key={number}
              className={`page-item ${isCurrentPage ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
          );
        })}
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <button className="page-link" onClick={handleClickNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default CompanyView;
