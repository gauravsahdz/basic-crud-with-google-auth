import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/form.css";
import { useNavigate } from "react-router-dom";

const EditVendorForm = () => {
  const navigate = useNavigate();
  const vendorId = window.location.pathname.split("/")[2];
  const [vendor, setVendor] = useState({
    vendorName: "",
    bankAccountNo: "",
    bankName: "",
    location: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      country: "",
      zipCode: "",
    },
  });

  useEffect(() => {
    axios
      .get(`https://basic-crud-operation-be.onrender.com/vendors/${vendorId}`)
      .then((response) => {
        setVendor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  }, [vendorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "bankAccountNo") return; // Prevent changes to bank account number
    setVendor({ ...vendor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://basic-crud-operation-be.onrender.com/vendors/${vendorId}`,
        vendor
      );
      alert("Vendor updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  return (
    <div className="edit-vendor-form-container">
      <div className="form-header">
        <b
          className="back-arrow"
          onClick={() => {
            window.history.back();
          }}
        >
          ➜
        </b>
        <h2>Edit Vendor</h2>
      </div>

      <form onSubmit={handleSubmit} className="edit-vendor-form">
        <div className="form-group">
          <label>Vendor Name:</label>
          <input
            type="text"
            name="vendorName"
            value={vendor.vendorName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Bank Account No:</label>
          <input
            type="text"
            name="bankAccountNo"
            value={vendor.bankAccountNo}
            disabled // Disable input for bank account number
          />
        </div>
        <div className="form-group">
          <label>Bank Name:</label>
          <input
            type="text"
            name="bankName"
            value={vendor.bankName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address Line 1:</label>
          <input
            type="text"
            name="addressLine1"
            value={vendor.location.addressLine1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address Line 2:</label>
          <input
            type="text"
            name="addressLine2"
            value={vendor.location.addressLine2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={vendor.location.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={vendor.location.country}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            value={vendor.location.zipCode}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn-update">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditVendorForm;
