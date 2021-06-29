import React from "react";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";

//Style imports
import "./css/Error.css";

// Component imports
import Navbar from "./Navbar";

function Error() {
  const history = useHistory();

  return (
    <>
      <Navbar />
      <div className="errorContainer">
        <h1> Oops! </h1>
        <div className="errorContent">
          <p>We're sorry. It looks like something went wrong.</p>
          <p className="error404">Error 404 (page not found)</p>
        </div>
        <div className="errorButtonContainer">
          <button onClick={() => history.goBack()} className="errorButton">
            GO BACK
          </button>
          <Link to="/">
            <button className="errorButton">GO HOME</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Error;
