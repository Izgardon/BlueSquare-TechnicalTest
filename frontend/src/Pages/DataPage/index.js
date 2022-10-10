import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./data.css";
import { Table } from "../../Components/Table";

export const DataPage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  //Getting data from login for user
  const { state } = useLocation();
  const navigate = useNavigate();

  //Prevents unwanted access
  if (state == null) {
    navigate("/");
  }
  //Setting up all data for page and components
  useEffect(() => {
    setUserDetails(state);
    getAllData();
  }, []);

  //Function that sends a request to get all users data, this is then put into a state and is queried from here, so no further requests are needed
  const getAllData = async () => {
    try {
      let options = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get("http://localhost:5005/users", options);
      if (data.error) {
        throw new Error(data.error);
      } else {
        setAllUsers(data);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <>
      <div className="logo"></div>
      <div className="table-container">
        <Table
          allUsers={allUsers}
          userDetails={userDetails}
          getAllData={getAllData}
        />
      </div>
    </>
  );
};
