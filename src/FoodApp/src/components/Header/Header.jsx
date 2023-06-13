import { useState } from "react";
import { LOGO_URL } from "../../utils/constants";
import "./header.scss";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [loggedIn, setloggedIn] = useState(true);

  const handleStyle = ({ isActive }) => {
    return { color: isActive ? "orange" : "inherit" };
  };

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={LOGO_URL} alt="food logo" className="logo" />
        </Link>
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <NavLink to="/" style={handleStyle}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" style={handleStyle}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" style={handleStyle}>
              Contact
            </NavLink>
          </li>
          <li>Cart</li>
        </ul>
      </div>

      {loggedIn ? (
        <button className="logout-btn" onClick={() => setloggedIn(false)}>
          <div className="logout-icon">
            <div />
          </div>
          Logout
        </button>
      ) : (
        <button className="login-btn" onClick={() => setloggedIn(true)}>
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
