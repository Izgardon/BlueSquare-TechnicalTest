import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export const ChildLogin = ({ setShowSignUp }) => {
  //Forms
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSignIn = async (e) => {
    if (userInput === "" || password === "") {
      setError("Missing email or password!");
    } else {
      try {
        let userDetails = {
          user_input: userInput,
          password,
        };
        let options = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        /*  const { data } = await axios.post(JSON.stringify(userDetails), options);
        if (data.error) {
          setError(data.error);
        } else {
          //Login user here
          //Set user data here
        } */

        /* loginError.textContent = "Incorrect email or password"; */
      } catch (err) {
        if (!err.response) {
          setError("No server response!");
        } else if (err.response.status === 401) {
          setError(
            "Unauthorized! Create an account or check your email/username and password!"
          );
        } else {
          setError("Login failed!");
        }
      }
    }
  };

  const onUserInputChange = (e) => {
    setUserInput(e.target.value);
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
            required
            placeholder="Email"
            onChange={onUserInputChange}
            aria-label="login-email"
          />
          <label htmlFor="login-password"></label>
          <input
            className="login-input"
            type="password"
            id="login-password"
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
