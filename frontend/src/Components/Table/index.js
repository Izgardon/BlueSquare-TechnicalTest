import React, { useEffect, useState } from "react";

import { AddEmployeeModal, EditEmployeeModal, SearchBar } from "../";

export const Table = ({ allUsers, userDetails, getAllData }) => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editUserDetails, setEditUserDetails] = useState();
  const [allUserData, setAllUserData] = useState([]);

  useEffect(() => {
    setAllUserData(allUsers);
  }, [allUsers]);

  //Opens edit modal and sends that rows data through to be edited
  const handleEdit = (val) => {
    setEditUserDetails(val);

    setEditModalShow(true);
  };

  //Opens add new user modal
  const handleAdd = () => {
    setAddModalShow(true);
  };

  return (
    <>
      <SearchBar />
      {
        //checking to see if user is an admin to give them access to add a new employee
        userDetails.isadmin ? (
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
            allUsers.map((val, key) => {
              return (
                <tr
                  key={key}
                  className={
                    val.email === userDetails.email
                      ? "me"
                      : val.isadmin && val.email !== userDetails.email
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
                    val.email === userDetails.email ? (
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
                    ) : (
                      ""
                    )
                  }
                  {userDetails.isadmin && val.email !== userDetails.email ? (
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
                    ""
                  )}
                </tr>
              );
            })
          }
        </tbody>
      </table>

      <AddEmployeeModal
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
      />
      <EditEmployeeModal
        editUserDetails={editUserDetails}
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
      />
    </>
  );
};
