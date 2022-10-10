import React, { useState } from "react";

export const SearchBar = ({ getResults }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    getResults(search);
    setSearch("");
  };

  const updateInput = (e) => {
    const input = e.target.value;
    setSearch(input);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
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
