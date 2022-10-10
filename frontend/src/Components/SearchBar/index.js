import React, { useState } from "react";

export const SearchBar = ({ getResults }) => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    getResults(search, dropdown);
    setSearch("");
  };

  const updateInput = (e) => {
    const input = e.target.value;
    setSearch(input);
  };

  const handleDropdown = (e) => {
    setDropdown(e.target.value);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <select className="dropdown" value={dropdown} onChange={handleDropdown}>
        <option hidden value="all">
          Select criteria
        </option>
        <option value="firstname">First Name</option>
        <option value="lastname">Last Name</option>
        <option value="jobrole">Role</option>
        <option value="department">Department</option>
        <option value="email">Email</option>
        <option value="number">Phone Number</option>
      </select>
      <label htmlFor="search"></label>
      <input
        id="search"
        type="text"
        placeholder="Search for users here"
        className="search-input"
        onChange={updateInput}
        value={search}
      />
      <input type="submit" className="edit-button" value="Search" />
    </form>
  );
};
