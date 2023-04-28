import React from "react";
import "./resturantCard.scss";
import { RESTURANT_NOT_FOUND_IMG_URL } from "../../utils/constants";

const NoResturantFound = () => {
  return (
    <div className="no-resturant-container">
      <img
        src={RESTURANT_NOT_FOUND_IMG_URL}
        alt="resturant not found"
        className="no-res-found"
      />
      <span className="res-text">
        No Resturant Found For the given Search....
      </span>
    </div>
  );
};

export default NoResturantFound;
