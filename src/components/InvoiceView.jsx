import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link ,NavLink} from 'react-router-dom';
import { DownloadTableExcel } from 'react-export-table-to-excel';


const InvoiceView = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const ref = useRef(null);
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('https://api-dev.quicklyinc.com/invoices', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setInvoices(response.data.invoices);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInvoices();
  }, []);
  useEffect(() => {
    
    const delay = 7000;

    setTimeout(() => {
      setLoading1(false);
    }, delay);
  }, []);
  const handleSort = (field) => {
    if (sortField === field) {
      // Reverse the sort order if the same field is clicked again
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set the new sort field and order
      setSortField(field);
      setSortOrder('asc');
    }
  };

 
  
  
  const getSortIndicator = (field) => {
    if (sortField === field) {
      // Display the sort indicator based on the current sort order
      return sortOrder=== 'asc' ? ' ▲' : ' ▼';
    }
    // Display the sort indicator as a neutral sign
    return <>&#11021;</>;
  };

  const formatCurrency = (value) => {
    return '$' + value?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US');
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const handleSearch = (e) => {

    const keyword = e.target.value.trimStart();

 

    setSearchKeyword(keyword);
   
    setCurrentPage(1); // Reset the current page when a new search keyword is entered
  };



  // Apply sorting to invoices
  const sortedInvoices = invoices.sort((a, b) => {
    if (sortField === 'totals.total') {
      const aValue = a.totals?.total;
      const bValue = b.totals?.total;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (sortField === 'totals.quick_pay_fee') {
      const aValue = a.totals?.quick_pay_fee;
      const bValue = b.totals?.quick_pay_fee;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (sortField === 'id') {
      const aValue = a?.id;
      const bValue = b?.id;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    else if (sortField === 'invoice_identifier') {
      const aValue = a?.invoice_identifier;
      const bValue = b?.invoice_identifier;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (sortField === 'Company.name') {
      const aValue = a.Company?.name || '';
      const bValue = b.Company?.name || '';
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);

    }
    else if (sortField === 'payingCompany.name') {
      const aValue = a.payingCompany?.name || '';
      const bValue = b.payingCompany?.name || '';
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);

    }
    else if (sortField === 'issue_date') 
  
      {
        const aValue = new Date(a?.issue_date);
        const bValue = new Date(b?.issue_date);
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      else if (sortField === 'due_date') 
  
      {
        const aValue = new Date(a?.due_date);
        const bValue = new Date(b?.due_date);
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
  
    
    else {
      // By default, sort by created date
      const aValue = new Date(a?.createdAt);
      const bValue = new Date(b?.createdAt);
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });


  // Apply search filter to invoices
  const filteredInvoices = sortedInvoices.filter(invoice =>{

    if (searchKeyword.trim() === '') {
      return true; // Return true if the search keyword is empty
    }

    // Convert the search keyword to lowercase for case-insensitive search
    const keyword = searchKeyword.toLowerCase();

    // Check if invoice identifier or company name matches the search keyword
    return (
      invoice.invoice_identifier?.toLowerCase() === keyword ||
      invoice.Company?.name.toLowerCase() === keyword
    );
  });

  // Calculate pagination
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers to be displayed at the bottom
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);
  const displayedPages = Math.min(totalPages, 10); // Adjust the number of displayed page numbers here
  const pageNumbers = [];
  let minPage = Math.max(1, currentPage - Math.floor(displayedPages / 2));
  const maxPage = Math.min(minPage + displayedPages - 1, totalPages);
  minPage = Math.max(1, maxPage - displayedPages + 1);
  for (let i = minPage; i <= maxPage; i++) {
    pageNumbers.push(i);
  }

  return (
   
    <div className="container">
 

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-3">

          <div style={{ marginLeft: '1080px' }}>
                        <NavLink to="/admin"  style={({ isActive }) => ({ 
                            color: isActive ? 'darkcyan' : 'Blue' })}>
                        Back to Admin Page
                        </NavLink>
                    </div>
          {/* <Link to="/admin">Back to  Admin Page</Link><br/> */}
            <h2 className="text-center">Invoices List</h2>
            <label htmlFor="searchInput" className="form-label">
              Search:
            </label>
            <input
              type="search"
              id="searchInput"
              className="form-control"
              value={searchKeyword}
              onChange={handleSearch}
              placeholder='Search by invoice Number number or Company name'
            />
          </div>

          <table className="table table-striped table-hover" ref={ref} id= "invoice-table">
            {/* Table headers */}
            <thead>
              <tr>
              <th className="align-middle" >Unique  Identifier</th>

                <th className="align-middle" onClick={() => handleSort('id')}>Invoice ID {getSortIndicator('id')}</th>
                <th  className="align-middle" onClick={() => handleSort('invoice_identifier')}>
                  Invoice Number {getSortIndicator('invoice_identifier')}
                </th>
                <th className="align-middle"  onClick={() => handleSort('Company.name')}>
                  Company Name {getSortIndicator('Company.name')}
                </th>
                <th className="align-middle" onClick={() => handleSort('issue_date')}>
                  Invoice Issue Date {getSortIndicator('issue_date')}
                </th>
                <th className="align-middle" onClick={() => handleSort('due_date')}>
                  Invoice Due Date {getSortIndicator('due_date')}
                </th>
                <th className="align-middle" onClick={() => handleSort('createdAt')}>
                  Invoice Creation Date {getSortIndicator('createdAt')}
                </th>
                <th className="align-middle"  onClick={() => handleSort('totals.total')}>Totals {getSortIndicator('totals.total')}</th>
                <th onClick={() => handleSort('totals.quick_pay_fee')}>
                  Quickly Pay Fee {getSortIndicator('totals.quick_pay_fee')}
                </th>
                <th className="align-middle"> Quickly Pay Fee Percentage 
                </th>
                <th className="align-middle">
                  Approved Amount </th>
                <th className="align-middle">
                Deployment Fee 
                </th>
                <th className="align-middle" onClick={() => handleSort('payingCompany.name')}>
               Buyer company name {getSortIndicator('payingCompany.name')}
                </th>

              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {currentInvoices.map((invoice) => (

                 
                      <tr
                  key={invoice.id}>
                
                <td><Link to={`/invoiced/${invoice.unique_identifier}`}>{invoice.unique_identifier}</Link></td>

              <td>{invoice.id}</td>
                  <td>{invoice?.invoice_identifier}</td>
                  <td>{invoice?.Company?.name}</td>
                  <td>{formatDate(invoice?.issue_date)}</td>
                  <td>{formatDate(invoice?.due_date)}</td>
                  <td>{formatDate(invoice?.createdAt)}</td>
                  <td>{formatCurrency(invoice?.totals?.total)}</td>
                  <td>{formatCurrency(invoice?.totals?.quick_pay_fee)}</td>
                  <td>{formatPercentage(invoice?.totals?.quick_pay_fee_percentage)}</td>
                  <td>{formatCurrency(invoice.totals?.approved_amount)}</td>
                  <td>{formatCurrency(invoice.totals?.deployment_fee)}</td>
                  <td>{(invoice.payingCompany?.name)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <DownloadTableExcel
                    filename="invoice table"
                    sheet="invoice"
                    table="invoice-table"
                    currentTableRef={ref.current}>
                      
                      <button className={`btn btn-success disabled ${loading1? 'disabled' : 'enabled'}`}>Export to Excel</button>

      
                       </DownloadTableExcel>
                      
               

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              Showing {indexOfFirstInvoice + 1} to {Math.min(indexOfLastInvoice, filteredInvoices.length)} of{' '}
              {filteredInvoices.length} entries
            </div>
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                {pageNumbers.map((number) => (
                  <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(number)}>
                      {number}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default InvoiceView;


