import React, { useEffect, useState } from "react";

import { AddEmployeeModal, EditEmployeeModal, SearchBar } from "../";

export const Table = ({ allUsers, personalDetails, getAllData }) => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editUserDetails, setEditUserDetails] = useState();
  const [allUserData, setAllUserData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    setAllUserData(allUsers);
  }, [allUsers]);

  useEffect(() => {
    setSearchData(allUsers);
  }, [allUserData]);

  //Opens edit modal and sends that rows data through to be edited
  const handleEdit = (val) => {
    setEditUserDetails(val);

    setEditModalShow(true);
  };

  //Opens add new user modal
  const handleAdd = () => {
    setAddModalShow(true);
  };

  //Deals with searching the users

  const getResults = (search, dropdown) => {
    if (search === "" || dropdown === "all") {
      setSearchData(allUserData);
    } else {
      let searchResults = [];
      allUserData.forEach((user) => {
        if (user[dropdown].toLowerCase().includes(search)) {
          searchResults.push(user);
        }
      });

      setSearchData(searchResults);
    }
  };

  return (
    <>
      <SearchBar getResults={getResults} />
      {
        //checking to see if user is an admin to give them access to add a new employee
        personalDetails.isadmin ? (
          <button className="edit-button add-employee" onClick={handleAdd}>
            Add New Employee
          </button>
        ) : (
          ""
        )
      }
      <table cellSpacing={0}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job Role</th>
            <th>Department</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            //looping through all users, checking if they are the user or an admin to give them editing rights, user id is added to the button for easy editing
            searchData.map((val, key) => {
              return (
                <tr
                  key={key}
                  className={
                    val.email === personalDetails.email
                      ? "me"
                      : val.isadmin && val.email !== personalDetails.email
                      ? "admin"
                      : ""
                  }
                >
                  <td>{val.firstname}</td>
                  <td>{val.lastname}</td>
                  <td>{val.jobrole}</td>
                  <td>{val.department}</td>
                  <td>{val.number}</td>
                  <td>{val.email}</td>
                  {
                    //checks to see if user is current db entry or if user is admin and gives them access to button to edit their data, which then sends through that users data
                    val.email === personalDetails.email ? (
                      <td className="button-field">
                        <button
                          className="edit-button"
                          onClick={() => {
                            handleEdit(val);
                          }}
                          id={val.id}
                        >
                          Edit My Details
                        </button>{" "}
                      </td>
                    ) : personalDetails.isadmin ? (
                      <td className="button-field">
                        <button
                          className="edit-button"
                          onClick={() => {
                            handleEdit(val);
                          }}
                          id={val.id}
                        >
                          Edit Employee Details
                        </button>{" "}
                      </td>
                    ) : (
                      <td></td>
                    )
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>

      <AddEmployeeModal
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        getAllData={getAllData}
      />
      <EditEmployeeModal
        personalDetails={personalDetails}
        editUserDetails={editUserDetails}
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        getAllData={getAllData}
      />
    </>
  );
};
