import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CompanyDetails = () => {
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get('https://api-dev.quicklyinc.com/companies', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const filteredCompany = response.data.companies.find((c) => c.name === name);
        setCompany(filteredCompany);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompany();
  }, [name]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US');
  };

  return (
    <div className="container py-4">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h2 className="mb-4">Company Details</h2>

          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Company ID:</th>
                <td>{company.id}</td>
              </tr>
              <tr>
                <th>Creation Date:</th>
                <td>{formatDate(company.createdAt)}</td>
              </tr>
              <tr>
                <th>Company Email:</th>
                <td>{company.primary_email}</td>
              </tr>
              <tr>
                <th>Company Address:</th>
                <td>{`${company.address_city},${company.address_line_1},
                ${company.address_line_2},${company.address_state },${company.address_country}`}</td>
              </tr>
              <tr>
                <th>Company Phone:</th>
                <td>{company.phone}</td>
              </tr>
              <tr>
                <th>Company Phone:</th>
                <td>{company.phone}</td>
              </tr>
              <tr>
                <th>Advance rate:</th>
                <td>{company.advance_rate}</td>
              </tr>
              <tr>
                <th>Fee Type:</th>
                <td>{company.fee_type}</td>
              </tr>

              <tr>
                <th>Flat rate:</th>
                <td>{company.flat_rate}</td>
              </tr>
              <tr>
                <th>Max credit Amount:</th>
                <td>{company.max_credit_amount}</td>
              </tr>
              <tr>
                <th>Tax Rate:</th>
                <td>{company.tax_rate}</td>
              </tr>
             <tr>
                <th>Variable Rate:</th>
                <td>{company.variable_rate}</td>
              </tr>
              <tr>
                <th>Vendor Flat  Rate:</th>
                <td>{company.vendor_flat_rate}</td>
              </tr>
              <tr>
                <th>Vendor Variable Rate:</th>
                <td>{company.vendor_variable_rate}</td>
              </tr>
            </tbody>
          </table>

          <Link to="/companies" className="btn btn-primary">Back to Company List Page</Link>
        </>
      )}
    </div>
  );
};

export default CompanyDetails;
