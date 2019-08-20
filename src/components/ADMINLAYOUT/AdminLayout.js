import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AdminLayout extends Component {
  logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  render() {
    return (
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          fontSize: "26px",
          minHeight: "64px",
          lineHeight: "64px",
          position: "relative",
          backgroundColor: "#e67e22",
          color: "#ddd"
        }}
      >
        <div style={{ minWidth: "320px", color: "white" }}>
          <strong>Welcome {localStorage.username}</strong>
        </div>
        <div style={{ minWidth: "220px" }}>
          <Link
            style={{ textDecoration: "none", color: "rgb(255, 196, 4)" }}
            to="/all"
          >
            Home
          </Link>
        </div>
        <div style={{ minWidth: "220px" }}>
          <Link
            style={{ textDecoration: "none", color: "rgb(255, 196, 4)" }}
            to="/register"
          >
            Add User
          </Link>
        </div>
        <div style={{ minWidth: "220px" }}>
          <Link
            style={{ textDecoration: "none", color: "rgb(255, 196, 4)" }}
            to="/newcard"
          >
            Add Card
          </Link>
        </div>
        <div style={{ minWidth: "220px" }}>
          <Link
            style={{ textDecoration: "none", color: "rgb(255, 196, 4)" }}
            to="/mycards"
            onClick={this.logout}
          >
            Logout
          </Link>
        </div>
      </nav>
    );
  }
}
