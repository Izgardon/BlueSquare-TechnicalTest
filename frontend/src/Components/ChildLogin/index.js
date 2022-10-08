import React, { useState } from "react";

import axios from "axios";

import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";

import { login, setUser } from "../../actions";

export const ChildLoginModal = (props) => {
  //Forms
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Redux

  const dispatch = useDispatch();

  const onSignIn = async (e) => {
    if (userInput === "" || password === "") {
      setError("Missing username/email or password!");
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

        const { data } = await axios.post(
          "https://read-herring.herokuapp.com/users/login/",
          JSON.stringify(userDetails),
          options
        );
        if (data.error) {
          setError(data.error);
        } else {
          dispatch(login());

          dispatch(setUser(data));
          props.onHide();
        }

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
      <Modal.Header className="align-items-center"></Modal.Header>
      <Modal.Body>
        <Modal.Title id="contained-modal-title-vcenter" className="login-title">
          Log In
        </Modal.Title>
        <form className="login">
          <label htmlFor="login-input"></label>
          <input
            className="login-input"
            type="text"
            id="login-input"
            required
            placeholder="Email or Username"
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
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="login-button-group">
          <button
            className="login-button"
            data-testid="login"
            onClick={onSignIn}
          >
            Sign in
          </button>
          <button
            className="login-button-link"
            id="toggle"
            aria-label="toggle-to-sign-up"
            onClick={() => props.setShowSignUp(true)}
          >
            Don't have an account? Create account
          </button>
        </div>
      </Modal.Footer>
    </>
  );
};
