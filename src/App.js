import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import VendorList from "./components/vendorList";
import EditVendorForm from "./components/editVendor";
import CustomGoogleLoginButton from "./components/login";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route exact path="/" element={<VendorList />} />
            <Route path="/edit/:id" element={<EditVendorForm />} />
            <Route path="/add" element={<EditVendorForm />} />
          </>
        ) : (
          <>
            <Route exact path="/login" element={<CustomGoogleLoginButton />} />
            <Route path="*" element={<CustomGoogleLoginButton />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
