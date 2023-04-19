import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="logo"></div>
      <div className="searchbar">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Start Searching..."
        />
      </div>
      <div className="user-icon">
        <span className="user-name">NS</span>
      </div>
    </header>
  );
};

export default Header;
