import { useState } from "react";
import { LOGO_URL } from "../../utils/constants";
import "./header.scss";

// const isLoggedIn = () => {
//   //TODO: make API call to check if user is authenticated;
//   return true;
// };

const Header = () => {
  const [loggedIn, setloggedIn] = useState(true);

  return (
    <div className="header">
      <div className="logo-container">
        <img src={LOGO_URL} alt="food logo" className="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About us</li>
          <li>Contact us</li>
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
