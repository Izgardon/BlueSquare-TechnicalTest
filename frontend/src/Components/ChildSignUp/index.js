import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import emailjs from "@emailjs/browser";

export const ChildSignUp = ({ setShowSignUp }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [number, setNumber] = useState("");

  const [error, setError] = useState("");

  const onRequestAccount = async (e) => {
    e.preventDefault();
    if (email === "" || number === "" || firstName === "" || lastName === "") {
      setError("Missing fields!");
    } else if (email !== confirmEmail) {
      setError("Emails do not match!");
    } else if (!email.includes("@bluesquare")) {
      setError("Email is invalid, only BlueSquare accounts allowed");
    } else if (number.length < 7 || number.length > 12) {
      setError("Invalid phone number");
    } else {
      setError("");
      let values = { firstName, lastName, email, number };
      emailjs
        .send(
          "service_m2ns8nj",
          "template_jbgslyv",
          values,
          "Srs742CC4TX_kVi0u"
        )
        .then(
          () => {
            alert("Your request has been sent");
            setConfirmEmail("");
            setEmail("");
            setFirstName("");
            setLastName("");
            setNumber("");
          },
          (error) => {
            console.log(error.text);
            alert("Error in request, please seek assistance");
          }
        );
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

  const onConfirmEmailChange = (e) => {
    setConfirmEmail(e.target.value);
  };

  const onNumberChange = (e) => {
    //Only allows numbers for better database formatting
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    console.log(onlyNumbers);
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
            id="register-email"
            required
            placeholder="Email"
            onChange={onEmailChange}
            aria-label="email"
          />
          <label htmlFor="register-confirmEmail"></label>
          <input
            className="login-input"
            type="text"
            id="register-confirmEmail"
            required
            placeholder="Confirm Email"
            onChange={onConfirmEmailChange}
            aria-label="email"
          />

          <label htmlFor="register-number"></label>
          <input
            className="login-input"
            type="tel"
            id="register-number"
            required
            placeholder="Phone Number"
            onChange={onNumberChange}
            aria-label="number"
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
