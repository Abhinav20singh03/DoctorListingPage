import React, { useState } from "react";
import "../styles/Header.css";

const Header = ({ onSearch, suggestions }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion) => {
     setInput(suggestion.name); 
    onSearch(suggestion.name);
  };

  return (
    <header className="header">
      <div>
      <input
        type="text"
        placeholder="Search doctor by name..."
        value={input}
        onChange={handleInputChange}
        className="search-input"
      />
      </div>
      
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
             <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                <div className="suggestion-name">{suggestion.name}</div>
               <div className="suggestion-speciality">{suggestion.speciality}</div>
             </li>
          ))}
        </ul>
      )}
    </header>
    ); 
};

 export default Header;
