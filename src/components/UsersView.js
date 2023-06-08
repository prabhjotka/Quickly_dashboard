import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserView = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(50);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api-dev.quicklyinc.com/auth/users', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const sortUsers = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIndicator = (field) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  const sortedUsers = users.sort((a, b) => {
    if (sortField === 'id') {
      return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
    } else if (sortField === 'CompanyId') {
      return sortDirection === 'asc' ? a.CompanyId - b.CompanyId : b.CompanyId - a.CompanyId;
    } else if (sortField === 'full_name') {
      return sortDirection === 'asc' ? a.full_name.localeCompare(b.full_name) : b.full_name.localeCompare(a.full_name);
    } else if (sortField === 'email') {
      return sortDirection === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
    } else {
      const aValue = new Date(a.createdAt);
      const bValue = new Date(b.createdAt);
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2 className="mt-3" align="center">
        User View
      </h2>
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
                <th onClick={() => sortUsers('id')}>
                  User ID{getSortIndicator('id')}
                </th>
                <th onClick={() => sortUsers('CompanyId')}>
                  Company ID{getSortIndicator('CompanyId')}
                </th>
                <th>Cognito ID</th>
                <th onClick={() => sortUsers('full_name')}>
                  Full Name{getSortIndicator('full_name')}
                </th>
                <th onClick={() => sortUsers('email')}>
                  Email{getSortIndicator('email')}
                </th>
                <th>Contact Number</th>
                <th onClick={() => sortUsers('createdAt')}>
                  Creation Date{getSortIndicator('createdAt')}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.CompanyId}</td>
                  <td>{user.cognito_id}</td>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString('en-US')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={sortedUsers.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalUsers / usersPerPage);

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

export default UserView;
