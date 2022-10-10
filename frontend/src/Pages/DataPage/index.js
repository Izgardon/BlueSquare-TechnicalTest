import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./data.css";
import { Table } from "../../Components/Table";

export const DataPage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  //Getting data from login for user
  const { state } = useLocation();

  useEffect(() => {
    setUserDetails(state);
    getAllData();
  }, []);

  const getAllData = async () => {
    try{
      let options = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        "http://localhost:5005/users",
        options
      );
      if (data.error) {
        setError(data.error);
      } else {
        setAllUsers(data)
      } 
    }
  };

  /*   let test = () => {
    if (Object.keys(userDetails).length === 0) {
      console.log(userDetails);
    }
  }; */

  return (
    <>
      {" "}
      <div
        onClick={() => {
          test();
        }}
      >
        DataPage
      </div>
      <div className="table-container">
        <Table />
      </div>
    </>
  );
};
