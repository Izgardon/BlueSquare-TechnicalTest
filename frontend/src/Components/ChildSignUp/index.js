import React, { useState } from "react";

import axios from "axios";
import emailjs from "@emailjs/browser";

export const ChildSignUp = ({ setShowSignUp }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const sendEmail = async (e) => {
    let values = { firstName, lastName, email, number };
    emailjs
      .send("service_m2ns8nj", "template_jbgslyv", values, "Srs742CC4TX_kVi0u")
      .then(
        () => {
          alert("Your request has been sent");
          setEmail("");
          setFirstName("");
          setLastName("");
          setNumber("");
          setPassword("");
          setConfirmPassword("");
        },
        (error) => {
          console.errorr(error.text);
          alert("Error in request, please seek assistance");
        }
      );
  };

  const onRequestAccount = async (e) => {
    e.preventDefault();
    if (
      email === "" ||
      number === "" ||
      firstName === "" ||
      lastName === "" ||
      password === ""
    ) {
      setError("Missing fields!");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else if (!email.includes("@bluesquare")) {
      setError("Email is invalid, only BlueSquare accounts allowed");
    } else if (number.length < 7 || number.length > 12) {
      setError("Invalid phone number");
    } else {
      setError("");
      try {
        let accountDetails = {
          email: email,
          password: password,
        };
        let options = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        await axios.post(
          "http://localhost:5005/auth/register",
          JSON.stringify(accountDetails),
          options
        );

        sendEmail();
      } catch (err) {
        if (!err.response) {
          setError("No server response");
        } else {
          console.error(err);
          setError("Login failed!");
        }
      }
    }
  };

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onNumberChange = (e) => {
    //Only allows numbers for better database formatting
    const onlyNumbers = e.target.value.replace(/\D/g, "");

    setNumber(onlyNumbers);
  };

  return (
    <>
      <div>
        <div className="login-title">Request an account</div>
        <form className="form-box">
          <label htmlFor="register-firstName"></label>
          <input
            className="login-input"
            type="text"
            value={firstName}
            id="register-firstName"
            required
            placeholder="First Name"
            onChange={onFirstNameChange}
            aria-label="First Name"
          />
          <label htmlFor="register-lastName"></label>
          <input
            className="login-input"
            type="text"
            value={lastName}
            id="register-lastName"
            required
            placeholder="Last Name"
            onChange={onLastNameChange}
            aria-label="Last Name"
          />
          <label htmlFor="register-email"></label>
          <input
            className="login-input"
            type="text"
            value={email}
            id="register-email"
            required
            placeholder="Email"
            onChange={onEmailChange}
            aria-label="email"
          />

          <label htmlFor="register-number"></label>
          <input
            className="login-input"
            value={number}
            type="tel"
            id="register-number"
            required
            placeholder="Phone Number"
            onChange={onNumberChange}
            aria-label="number"
          />
          <label htmlFor="register-password"></label>
          <input
            className="login-input"
            type="password"
            value={password}
            id="register-password"
            required
            placeholder="Password"
            onChange={onPasswordChange}
            aria-label="password"
          />
          <label htmlFor="register-confirmPassword"></label>
          <input
            className="login-input"
            type="password"
            value={confirmPassword}
            id="register-confirmPassword"
            required
            placeholder="Confirm Password"
            onChange={onConfirmPasswordChange}
            aria-label="password"
          />
          <div className="login-error">{error}</div>

          <button className="login-button" onClick={onRequestAccount}>
            Request
          </button>
        </form>
      </div>

      <button
        className="login-button-link"
        aria-label="toggle-to-log-in"
        id="toggle"
        onClick={() => setShowSignUp(false)}
      >
        Already have an account? Sign in
      </button>
    </>
  );
};
