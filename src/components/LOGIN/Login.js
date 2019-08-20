import React, { Component } from "react";
import Logo from "../LOGO/Logo";
import "./login.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

class Login extends Component {
  state = {
    username: "",
    password: "",
    redirect: false
  };

  login = () => {
    axios
      .post("https://app-ticket-back.herokuapp.com/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        const decoded = jwt_decode(localStorage.getItem("token"));
        console.log(decoded);
        localStorage.setItem("isAdmin", decoded.admin);
        localStorage.setItem("username", decoded.username);
        this.setState({ redirect: true });
        this.state.redirect && localStorage.getItem("isAdmin") === "true"
          ? this.props.history.push("/all")
          : this.props.history.push("/mycards");
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="login">
        <Logo />
        <input
          onChange={this.handleChange}
          value={this.state.username}
          className="loginInput"
          type="text"
          name="username"
          placeholder="enter your username"
          required
        />
        <input
          onChange={this.handleChange}
          value={this.state.password}
          className="loginInput"
          name="password"
          type="password"
          placeholder="enter your password"
          required
        />
        <button onClick={this.login}>LOGIN</button>
      </div>
    );
  }
}

export default Login;
