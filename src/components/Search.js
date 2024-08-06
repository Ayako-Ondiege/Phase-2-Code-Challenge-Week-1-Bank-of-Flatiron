import React, { useState } from "react";

function Search({ onSearch }) {
  // State to hold the current search term
  const [searchTerm, setSearchTerm] = useState("");

  // Handle changes to the input field
  function handleInputChange(e) {
    setSearchTerm(e.target.value); // Update the searchTerm state with the current input value
  }

  // Handle search button click
  function handleSearchClick() {
    onSearch(searchTerm); // Call the parent component's onSearch function with the current searchTerm
  }

  return (
    <div className="ui large fluid icon input">
      {/* Input field for search */}
      <input
        type="text"
        placeholder="Search your Recent Transactions" // Placeholder text for the input field
        value={searchTerm} // Set the input field value to the current searchTerm
        onChange={handleInputChange} // Call handleInputChange when the input value changes
      />
      {/* Search icon button */}
      <i 
        className="circular search link icon" // Styling for the search icon
        onClick={handleSearchClick} // Call handleSearchClick when the icon is clicked
      ></i>
    </div>
  );
}

export default Search;
