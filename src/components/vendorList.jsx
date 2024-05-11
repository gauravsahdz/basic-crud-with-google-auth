import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/vendor.css";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    axios
      .get("https://basic-crud-operation-be.onrender.com/vendors")
      .then((response) => {
        setVendors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendors:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    alert("Are you sure you want to delete this vendor?");
    try {
      await axios.delete(
        `https://basic-crud-operation-be.onrender.com/vendors/${id}`
      );
      alert("Vendor deleted successfully!");
      setVendors(vendors.filter((vendor) => vendor._id !== id));
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="vendor-list-container">
      <div className="header">
        <h2>Vendors</h2>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <table className="vendor-table">
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Bank Account No</th>
            <th>Bank Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor.vendorName}</td>
              <td>{vendor.bankAccountNo}</td>
              <td>{vendor.bankName}</td>
              <td>
                <a href={`/edit/${vendor._id}`}>Edit</a>
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(vendor._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorList;
