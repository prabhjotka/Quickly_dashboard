import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const InvoiceDetails = () => {
  const { unique_identifier } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`https://api-dev.quicklyinc.com/invoices/${unique_identifier}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setInvoice(response.data.invoice);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInvoice();
  }, [unique_identifier]);

  const formatCurrency = (value) => {
    return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US');
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="container">
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center">Here are the details of the invoice</h2>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Invoice ID:</th>
                <td>{invoice.id}</td>
              </tr>
              <tr>
                <th>Invoice Identifier:</th>
                <td>{invoice.invoice_identifier}</td>
              </tr>
              <tr>
                <th>Unique Identifier:</th>
                <td>{invoice.unique_identifier}</td>
              </tr>
              <tr>
                <th>Company Name:</th>
                <td>{invoice.Company?.name || ''}</td>
              </tr>
              <tr>
                <th>Issue Date:</th>
                <td>{formatDate(invoice.issue_date)}</td>
              </tr>
              <tr>
                <th>Creation Date:</th>
                <td>{formatDate(invoice.createdAt)}</td>
              </tr>
              <tr>
                <th>Totals:</th>
                <td>{formatCurrency(invoice.totals.total)}</td>
              </tr>
              <tr>
                <th>Quick Pay Fee:</th>
                <td>{formatPercentage(invoice.totals.quick_pay_fee)}</td>
              </tr>
              <tr>
                <th>Quick Pay Fee Percentage:</th>
                <td>{formatPercentage(invoice.totals.quick_pay_fee_percentage)}</td>
              </tr>
              <tr>
                <th>Quick Pay Fee Total:</th>
                <td>{formatCurrency(invoice.totals.quick_pay_total)}</td>
              </tr>
              <tr>
                <th>Deployment Fee</th>
                <td>{formatCurrency(invoice.totals.deployment_fee)}</td>
              </tr>
              <tr>
                <th>Approved Amount</th>
                <td>{formatCurrency(invoice.totals.approved_amount)}
               </td>
              </tr>
              <tr>
                <th>Approved Holdback Amount</th>
                <td>{formatCurrency(invoice.totals.approved_holdback_amount)}
               </td>
              </tr>

              <tr>
                <th>Advance  Amount</th>
                <td>{formatCurrency(invoice.totals.advance_amount)}
               </td>
              </tr>
              <tr>
                <th>Balance Amount</th>
                <td>{formatCurrency(invoice.totals.balance)}
               </td>
              </tr>
              
            </tbody>
          </table>
          
          <Link to="/invoices" className="btn btn-primary">Back to Invoice List Page</Link>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetails;
