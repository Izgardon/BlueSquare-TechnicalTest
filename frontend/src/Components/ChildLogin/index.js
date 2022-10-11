import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ChildLogin = ({ setShowSignUp }) => {
  //Forms
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSignIn = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Missing email or password!");
    } else {
      try {
        /* let data = {
          department: "Tech",
          email: "will@bluesquare.com",
          firstname: "Will3",
          id: 1,
          isadmin: true,
          jobrole: "Coder",
          lastname: "Sessions",
          number: "0781927812",
        }; */

        let loginDetails = {
          email: email,
          password: password,
        };
        let options = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.post(
          "http://localhost:5005/auth/login",
          JSON.stringify(loginDetails),
          options
        );
        if (data.error) {
          setError(data.error);
        } else {
          navigate("/users", { state: data });
        }
      } catch (err) {
        if (!err.response) {
          setError("No server response!");
        } else if (err.response.status === 401) {
          setError(
            "Unauthorized! Create an account or check your email and password!"
          );
        } else {
          setError("Login failed!");
        }
      }
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div>
        <div className="login-title">Log In</div>
        <form className="form-box">
          <label htmlFor="login-input"></label>
          <input
            className="login-input"
            type="text"
            id="login-input"
            value={email}
            required
            placeholder="Email"
            onChange={onEmailChange}
            aria-label="login-email"
          />
          <label htmlFor="login-password"></label>
          <input
            className="login-input"
            type="password"
            id="login-password"
            value={password}
            required
            placeholder="Password"
            onChange={onPasswordChange}
            aria-label="password"
          />
          <div className="login-error">{error}</div>
          <button className="login-button" onClick={onSignIn}>
            Sign in
          </button>
        </form>
      </div>

      <button
        className="login-button-link"
        id="toggle"
        aria-label="toggle-to-sign-up"
        onClick={() => setShowSignUp(true)}
      >
        Don't have an account? Request here!
      </button>
    </>
  );
};
