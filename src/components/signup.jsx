import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      action: "signup",
    };

    axios
      .post("http://localhost:3001/signup", formData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 201) {
          // Handle successful signup (e.g., redirect to login)
        } else {
          setSignupError("Signup failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
        setSignupError("An error occurred during signup.");
      })
      .then(navigate("/dashboard"));
  };

  return (
    <div>
      <h1>Signup</h1>
      <form id="signupForm" onSubmit={handleSignupSubmit}>
        <label htmlFor="signupEmail">Email:</label>
        <input
          type="email"
          id="signupEmail"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="signupPassword">Password:</label>
        <input
          type="password"
          id="signupPassword"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="hidden" name="action" value="signup" />
        <button type="submit">Sign Up</button>
        <div className="error" id="signupError">
          {signupError}
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
