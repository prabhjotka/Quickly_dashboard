import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const InvoiceView = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');

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
      return sortOrder === 'asc' ? '▲' : '▼';
    }
    return '';
  };

  const formatCurrency = (value) => {
   

    return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US');
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  // Apply sorting to invoices
  const sortedInvoices = invoices.sort((a, b) => {
    if (sortField === 'totals.total') {
      const aValue = a.totals.total;
      const bValue = b.totals.total;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (sortField === 'totals.quick_pay_fee') {
      const aValue = a.totals.quick_pay_fee;
      const bValue = b.totals.quick_pay_fee;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    } 
    else if (sortField === 'id'){
    
      const aValue = a.id;
      const bValue = b.id;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    else if (sortField === 'company.name'){
      const aValue = a.Company?.name || '';
      const bValue = b.Company?.name || '';
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
     
    
    }
   



    else {
//By default sort by created date

      const aValue = new Date(a.createdAt);
      const bValue = new Date(b.createdAt);
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      
    }
  });

  // Calculate pagination
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = sortedInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers to be displayed at the bottom
  const totalPages = Math.ceil(sortedInvoices.length / invoicesPerPage);
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
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')}>
                  Invoice ID {getSortIndicator('id')}
                </th>
                <th onClick={() => handleSort('invoice_identifier')}>
                  Invoice Identifier {getSortIndicator('invoice_identifier')}
                </th>
                <th onClick={() => handleSort('Company.name')}>
                  Company Name {getSortIndicator('Company.name')}
                </th>
                <th onClick={() => handleSort('issue_date')}>
                  Invoice Issue Date {getSortIndicator('issue_date')}
                </th>
                <th onClick={() => handleSort('createdAt')}>
                  Invoice Creation Date {getSortIndicator('createdAt')}
                </th>
                <th onClick={() => handleSort('totals.total')}>
                  Totals {getSortIndicator('totals.total')}
                </th>
                <th onClick={() => handleSort('totals.quick_pay_fee')}>
                  Quickly Pay Fee {getSortIndicator('totals.quick_pay_fee')}
                </th>
                <th onClick={() => handleSort('totals.quick_pay_fee_percentage')}>
                  Quickly Pay Fee Percentage {getSortIndicator('totals.quick_pay_fee_percentage')}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.invoice_identifier}</td>
                  <td>{invoice.Company?.name}</td>
                  <td>{formatDate(invoice.issue_date)}</td>
                  <td>{formatDate(invoice.createdAt)}</td>
                  <td>{formatCurrency(invoice.totals.total)}</td>
                  <td>{formatCurrency(invoice.totals.quick_pay_fee)}</td>
                  <td>{formatPercentage(invoice.totals.quick_pay_fee_percentage)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              Showing {indexOfFirstInvoice + 1} to {Math.min(indexOfLastInvoice, sortedInvoices.length)} of{' '}
              {sortedInvoices.length} entries
            </div>
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                {pageNumbers.map((number) => (
                  <li
                    key={number}
                    className={`page-item ${number === currentPage ? 'active' : ''}`}
                  >
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
