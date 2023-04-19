import React from "react";

/**
 *
 *    RESTURANT APPLICATION
 *
 * HEADER
 *  - logo
 *  - navbar item
 *
 * BODY
 *  - searchbar
 *  - resturant container
 *      - resturantCard
 *          - Img
 *          - Name ---> cusinie (bottom)
 *          - rating time price
 *
 * FOOTER
 *  - copyright
 *  - link
 *  - address
 *  - contact
 *
 *
 */

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp2SyQhEI2W2R9JeF7CitSlkqGKjtoLAihYoy0IgrnTNhuyhDqtg0Guf5cUc4EGSuRv58&usqp=CAU"
          alt="food logo"
          className="logo"
        />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About us</li>
          <li>Contact us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

const ResturantCard = () => {
  return (
    <div className="res-card">
      <img
        className="res-logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwDtxDkEN0Em1kNIX6UJsWZ2GkQp5cebup4d44PBrYnzsQOnIPMBfJ4oOIFJRl_qjxOj0&usqp=CAU"
        alt="resturant logo"
      />
      <div className="about">
        <h3 className="res-name">Billu Da Dabha</h3>
        <i className="res-cusinie">Veg Food, North Indian, Chiniese</i>
      </div>
      <div className="res-info">
        <ul>
          <li>Rating : *****</li>
          <li>Delivery: 25mins</li>
          <li>Price: $30</li>
        </ul>
      </div>
    </div>
  );
};

const Body = () => {
  return (
    <div className="body">
      <div className="res-search">
        <input
          type="search"
          name="resturant"
          placeholder="Type Resturant Name..."
        />
        <button className="submit" type="submit">
          Search
        </button>
      </div>
      <div className="res-container">
        {/* resturant card separate component as it resuable */}
        {[...Array(10)].map((_, index) => {
          return <ResturantCard key={index} />;
        })}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      <ul>
        <li>
          <a href="">Lorem, ipsum.</a>
        </li>
        <li>
          <a href="">Lorem ipsum dolor sit.</a>
        </li>
      </ul>
      <h5 className="copyright">@copyright 2023</h5>

      <div className="res-address">
        <address>Lorem ipsum dolor sit amet.</address>
        <code>
          Contact: <i>+919334XXXXXX93</i>
        </code>
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default AppLayout;
