import React from "react";

export const Table = () => {
  const data = [
    {
      firstName: "Anom",
      lastName: "test",
      jobRole: "Tech",
      department: "Tech",
      number: "09712839213",
      email: "tst1@bluesquare.com",
    },
    {
      firstName: "Megha",
      lastName: "test",
      jobRole: "Tech",
      department: "Techle",
      number: "09712839213",
      email: "tst2@bluesquare.com",
    },
    {
      firstName: "Subham",
      lastName: "test",
      jobRole: "Tech",
      department: "Tech",
      number: "09712839213",
      email: "tst3@bluesquare.com",
    },
  ];
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
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.firstName}</td>
              <td>{val.lastName}</td>
              <td>{val.jobRole}</td>
              <td>{val.department}</td>
              <td>{val.number}</td>
              <td>{val.email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
