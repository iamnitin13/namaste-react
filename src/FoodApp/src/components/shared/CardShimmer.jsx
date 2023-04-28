import React from "react";
import "./cardShimmer.scss";

const CardShimmer = (props) => {
  return (
    <div className="card-container">
      {[...Array(props.numOfCard)].map((_, index) => {
        return (
          <div key={index} className="card-shimmer">
            <div className="img-shimmer shimmer" />
            <div className="card-footer-shimmer">
              <div className="heading-shimmer shimmer" />
              <div className="sub-heading-shimmer shimmer" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardShimmer;
