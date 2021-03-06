import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./NavMenu.css";

export default function NavMenu() {
  return (
    <>
      <div class="nav justify-content-center">
        <Link to="/" className="links">
          Sign In
        </Link>
        <Link to="/signup" className="links">
          Sign Up
        </Link>
      </div>
    </>
  );
}
