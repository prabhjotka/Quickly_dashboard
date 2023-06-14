import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://api-dev.quicklyinc.com/auth/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const filterUser = response.data.users.find((u) => u.id === Number(id));
        setUser(filterUser);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="container">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h2 className="mb-4">User Details</h2>
          <table className="table table-striped">
            <tbody>
              <tr>
                <td><strong>User Name:</strong></td>
                <td>{user.full_name}</td>
              </tr>
              <tr>
                <td><strong>User ID:</strong></td>
                <td>{user.id}</td>
              </tr>
              <tr>
                <td><strong>Company ID:</strong></td>
                <td>{user.CompanyId}</td>
              </tr>
              <tr>
                <td><strong>Cognito ID:</strong></td>
                <td>{user.cognito_id}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td><strong>Contact Number:</strong></td>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <td><strong>Creation Date:</strong></td>
                <td>{new Date(user.createdAt).toLocaleDateString('en-US')}</td>
              </tr>
            </tbody>
          </table>
          <Link to="/users" className="btn btn-primary">Back to Users List Page</Link>
        </>
      )}
    </div>
  );
};

export default UserDetails;
