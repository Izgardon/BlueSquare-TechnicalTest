import React, { useState, useEffect } from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";

export const EditEmployeeModal = ({
  show,
  onHide,
  editUserDetails,
  getAllData,
  personalDetails,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (editUserDetails) {
      setFirstName(editUserDetails.firstname);
      setLastName(editUserDetails.lastname);
      setJobRole(editUserDetails.jobrole);
      setDepartment(editUserDetails.department);
      setEmail(editUserDetails.email);
      setNumber(editUserDetails.number);
      setIsAdmin(editUserDetails.isadmin);
    }
  }, [editUserDetails, show]);

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };
  const onJobRoleChange = (e) => {
    setJobRole(e.target.value);
  };

  const onNumberChange = (e) => {
    //Only allows numbers for better database formatting
    const onlyNumbers = e.target.value.replace(/\D/g, "");

    setNumber(onlyNumbers);
  };

  const onAdminChange = (e) => {
    setIsAdmin(!isAdmin);
  };

  //sends a request to update the user,only admins can change the admin field
  const editUser = async (e) => {
    e.preventDefault();
    if (
      email === editUserDetails.email &&
      number === editUserDetails.number &&
      firstName === editUserDetails.firstname &&
      lastName === editUserDetails.lastname &&
      jobRole === editUserDetails.jobrole &&
      department === editUserDetails.department &&
      isAdmin === editUserDetails.isadmin
    ) {
      onHide();
    } else if (
      email === "" ||
      number === "" ||
      firstName === "" ||
      lastName === "" ||
      jobRole === "" ||
      department === ""
    ) {
      setError("Missing fields!");
    } else if (!email.includes("@bluesquare")) {
      setError("Email is invalid, only BlueSquare accounts allowed");
    } else if (number.length < 7 || number.length > 12) {
      setError("Invalid phone number");
    } else {
      setError("");
      try {
        let addUserDetails = {
          firstNameNew: firstName,
          lastNameNew: lastName,
          jobRoleNew: jobRole,
          departmentNew: department,
          numberNew: number,
          emailNew: email,
          isAdminNew: isAdmin,
        };
        let options = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.post(
          `http://localhost:5005/users/${editUserDetails.id}`,
          JSON.stringify(addUserDetails),
          options
        );

        if (data.error) {
          setError(data.error);
        } else {
          alert(data.msg);
          getAllData();
          onHide();
        }
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

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="align-items-center"></Modal.Header>
      <Modal.Body>
        <Modal.Title id="contained-modal-title-vcenter" className="login-title">
          Edit User Details
        </Modal.Title>
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
          <label htmlFor="register-jobRole"></label>
          <input
            className="login-input"
            type="text"
            value={jobRole}
            id="register-jobRole"
            required
            placeholder="Role"
            onChange={onJobRoleChange}
            aria-label="Job Role"
          />
          <label htmlFor="register-department"></label>
          <input
            className="login-input"
            type="text"
            value={department}
            id="register-department"
            required
            placeholder="Department"
            onChange={onDepartmentChange}
            aria-label="department"
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
          {personalDetails.isadmin ? (
            <div className="checkbox">
              <input
                type="checkbox"
                id="isadmin"
                name="isadmin"
                checked={isAdmin}
                onChange={onAdminChange}
              />
              <label htmlFor="isadmin">Make admin?</label>
            </div>
          ) : (
            ""
          )}

          <div className="login-error">{error}</div>

          <button className="login-button" onClick={editUser}>
            Save
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
