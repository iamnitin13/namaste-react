import React, { useRef } from "react";
import resturants from "./src/json/resturants.json";

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

const ResturantCard = ({ card }) => {
  const {
    name,
    cuisines,
    cloudinaryImageId,
    avgRating,
    slaString,
    costForTwoString,
    veg,
    address,
  } = card;

  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${cloudinaryImageId}`}
        alt={name}
      />
      <div className="about">
        <h3 className="res-name">{name}</h3>
        <i className="res-cusinie">{cuisines.join()}</i>
        <span className="res-food-type" role={veg ? "veg" : "non-veg"} />
      </div>
      <hr />
      <div className="res-info">
        <ul>
          <li>{!isNaN(avgRating) ? `${avgRating} stars` : avgRating}</li>
          <li>{slaString}</li>
          <li>{costForTwoString}</li>
        </ul>
        <hr />
        <address>
          <img
            src="https://img.freepik.com/premium-vector/location-point-icon-vector-illustration_9999-17225.jpg?w=2000"
            alt="location-logo"
          />
          <span>{address}</span>
        </address>
      </div>
    </div>
  );
};

const Body = () => {
  const btnRef = useRef();
  return (
    <div className="body">
      <div className="res-search">
        <input
          type="search"
          name="resturant"
          placeholder="Type Resturant Name..."
          onChange={(e) =>
            e.target.value.length
              ? (btnRef.current.style.display = "#e36313cc")
              : (btnRef.current.style.color = "#c5c0c0c8")
          }
        />
        <button className="submit" type="submit" ref={btnRef}>
          Search
        </button>
      </div>
      <div className="res-container">
        {/* resturant card separate component as it resuable */}
        {resturants.cards.map(({ data: card }) => {
          return <ResturantCard card={card} key={card.id} />;
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
