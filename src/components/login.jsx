import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    axios
      .post("http://localhost:3001/login", formData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          // Handle successful login (e.g., redirect)
          sessionStorage.setItem("username", response.data.username);
        } else {
          setLoginError("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setLoginError("An error occurred during login.");
      })
      .then(navigate("/dashboard"));
  };

  return (
    <div>
      <h1>Login</h1>
      <form id="loginForm" onSubmit={handleLoginSubmit}>
        <label htmlFor="loginEmail">Email:</label>
        <input
          type="email"
          id="loginEmail"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="loginPassword">Password:</label>
        <input
          type="password"
          id="loginPassword"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="hidden" name="action" value="login" />
        <button type="submit">Log In</button>
        <div className="error" id="loginError">
          {loginError}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
