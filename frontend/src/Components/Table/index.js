import React, { useEffect, useState } from "react";

export const Table = ({ allUsers, userDetails }) => {
  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  const rightToEdit = (userDetails) => {};

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Job Role</th>
          <th>Department</th>
          <th>Contact Number</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.firstname}</td>
              <td>{val.lastname}</td>
              <td>{val.jobrole}</td>
              <td>{val.department}</td>
              <td>{val.number}</td>
              <td>{val.email}</td>
              {val.email === userDetails.email ? (
                <td>
                  <button className="edit-button">Edit My Details</button>{" "}
                </td>
              ) : (
                ""
              )}
              {userDetails.isadmin && val.email !== userDetails.email ? (
                <td>
                  <button className="edit-button">Edit Employee Details</button>{" "}
                </td>
              ) : (
                ""
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
