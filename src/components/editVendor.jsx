import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

const EditVendorForm = () => {
  const navigate = useNavigate();
  const vendorId = window.location.pathname.split("/")[2];
  const isEditing = !!vendorId;
  const [isLoading, setIsLoading] = useState(false);
  const [vendor, setVendor] = useState({
    vendorName: "",
    bankAccountNo: "",
    bankName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    zipCode: "",
  });

  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      axios
        .get(`https://basic-crud-operation-be.onrender.com/vendors/${vendorId}`)
        .then((response) => {
          console.log("Vendor details:", response.data);
          setVendor({
            ...response.data,
            ...{
              addressLine1: response.data.location.addressLine1,
              addressLine2: response.data.location.addressLine2,
              city: response.data.location.city,
              country: response.data.location.country,
              zipCode: response.data.location.zipCode,
            },
          });
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          alert("Error fetching vendor details:", error);
        });
    }
  }, [vendorId, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor((prevVendor) => ({
      ...prevVendor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newVendor = {
      ...vendor,
      location: {
        addressLine1: vendor.addressLine1,
        addressLine2: vendor.addressLine2,
        city: vendor.city,
        country: vendor.country,
        zipCode: vendor.zipCode,
      },
    };
    try {
      if (isEditing) {
        await axios.patch(
          `https://basic-crud-operation-be.onrender.com/vendors/${vendorId}`,
          newVendor
        );
        alert("Vendor updated successfully!");
      } else {
        await axios.post(
          "https://basic-crud-operation-be.onrender.com/vendors",
          newVendor
        );
        alert("Vendor added successfully!");
      }
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      alert("Error updating/adding vendor:", error);
    }
  };

  return (
    <div className="edit-vendor-form-container">
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
      <div className="form-header">
        <b
          className="back-arrow"
          onClick={() => {
            window.history.back();
          }}
        >
          ➜
        </b>
        <h2>{isEditing ? "Edit Vendor" : "Add Vendor"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="edit-vendor-form">
        <div className="form-group">
          <label>
            Vendor Name<span className="mandatory">*</span>:
          </label>
          <input
            type="text"
            name="vendorName"
            value={vendor.vendorName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            Bank Account No<span className="mandatory">*</span>:
          </label>
          <input
            type="text"
            name="bankAccountNo"
            value={vendor.bankAccountNo}
            onChange={handleChange}
            required
            maxLength={16}
            pattern="\d{16}"
          />
          <small className="info-text">
            Bank account number should be 16 digits.
          </small>
        </div>
        <div className="form-group">
          <label>
            Bank Name<span className="mandatory">*</span>:
          </label>
          <input
            type="text"
            name="bankName"
            value={vendor.bankName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address Line 1:</label>
          <input
            type="text"
            name="addressLine1"
            value={vendor.addressLine1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            Address Line 2<span className="mandatory">*</span>:
          </label>
          <input
            type="text"
            name="addressLine2"
            value={vendor.addressLine2}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={vendor.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={vendor.country}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            Zip Code<span className="mandatory">*</span>:
          </label>
          <input
            type="number"
            name="zipCode"
            value={vendor.zipCode}
            onChange={handleChange}
            pattern="\d{6}"
            title="Zip code should be 6 digits."
            required
            maxLength={6}
          />
          <small className="info-text">Zip code should be 6 digits.</small>
        </div>
        <button type="submit" className="btn-update">
          {isEditing ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default EditVendorForm;
