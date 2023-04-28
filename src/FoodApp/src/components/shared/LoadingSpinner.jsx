import React from "react";
import "./loadingSpinner.scss";

const LoadingSpinner = (props) => {
  return (
    <div className="container">
      <div className="loading-spinner" style={{ ...props.style }} />
    </div>
  );
};

export default LoadingSpinner;
