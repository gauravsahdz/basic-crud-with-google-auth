import { GoogleLogin } from "@react-oauth/google";
import "../styles/login.css"; // Import CSS file for styling
import { jwtDecode } from "jwt-decode";

const CustomGoogleLoginButton = () => {
  return (
    <div className="custom-google-login">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          try {
            const decoded = jwtDecode(credentialResponse?.credential);
            if (decoded) {
              localStorage.setItem("token", credentialResponse.credential);
              window.location.href = "/";
            }
          } catch (error) {
            console.error("Error while setting token or navigating:", error);
            alert("An error occurred while logging in.");
          }
        }}
        onError={(error) => {
          console.error("Google login error:", error);
          alert("Login Failed");
        }}
      />
    </div>
  );
};

export default CustomGoogleLoginButton;
