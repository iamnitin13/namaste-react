import React from "react";
import "./error.scss";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError(); // provide a better error message and error status; it catches the error & not throw on your console.

  return (
    <div className="error-container">
      <h2 className="oops-error">{error?.status} Oops!!!</h2>
      <p className="err-message">{error?.error?.message}</p>
    </div>
  );
};

export default Error;
