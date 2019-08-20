import React from "react";
import { Link } from "react-router-dom";

export const Page404 = ({ location }) => (
  <div>
    <h2>
      No match found for <code>{location.pathname}</code>
    </h2>
    <Link to="/">
      <button
        style={{ background: "black", color: "#F8A907", fontSize: "24px" }}
      >
        BACK TO LOGIN
      </button>
    </Link>
  </div>
);
