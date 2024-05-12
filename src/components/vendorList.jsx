import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/vendor.css";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://basic-crud-operation-be.onrender.com/vendors")
      .then((response) => {
        setVendors(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vendors:", error);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    alert("Are you sure you want to delete this vendor?");
    setIsLoading(true);
    try {
      await axios.delete(
        `https://basic-crud-operation-be.onrender.com/vendors/${id}`
      );
      alert("Vendor deleted successfully!");
      setVendors(vendors.filter((vendor) => vendor._id !== id));
      setIsLoading(false);
    } catch (error) {
      console.error("Error deleting vendor:", error);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleAdd = () => {
    window.location.href = "/add";
  };

  return (
    <div className="vendor-list-container">
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src="https://i.stack.imgur.com/kOnzy.gif"
            alt="loading"
            height="50"
            width="50"
          />
        </div>
      )}
      <div className="header">
        <h2>Vendors</h2>
        <div className="right-btn-group">
          <button className="add" onClick={handleAdd}>
            Add
          </button>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
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
