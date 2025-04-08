import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Login.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
  try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
          email: email,
          password: password
      });

      const token = response.data;

      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        sessionStorage.setItem("jwtToken", token);
        sessionStorage.setItem("userId", userId);

        navigate("/dashboard");
      } else {
        alert("Invalid credentials!");
      }
      
  } catch (error) {
    console.error("Error logging in", error);
    if (error.response && error.response.data && error.response.data.error) {
      setErrorMessage(error.response.data.error); 
    } else {
      setErrorMessage("Something went wrong. Please try again.");
    }
  }
  };

  return (
    <div className="login-container">
      <h2>User login</h2>
      
      <form onSubmit={handleLogin}>
        <input
        className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
        className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && (
          <div style={{ color: "red", marginTop: "5px", fontSize: "0.9rem" }}>
            {errorMessage}
          </div>
        )}
        
        <button className="login-button" type="submit">Login</button>
      </form>
    
    </div>
  );
};

export default Login;