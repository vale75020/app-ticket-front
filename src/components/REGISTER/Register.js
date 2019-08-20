import React, { Component } from "react";
import "./register.css";
import axios from "axios";
import AdminLayout from "../ADMINLAYOUT/AdminLayout"

class Register extends Component {
  state = {
    err: "",
    userCreate: "",
    username: "",
    password: ""
  };

  handleOnSubmit = e => {  // envoier à la bdd le username et password
    e.preventDefault();

    this.setState({
      err: '',
      userCreate: ''
    })
    const newUser = {   // new user
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("https://app-ticket-back.herokuapp.com/register", newUser)  // post pour registrer les données
      .then(response => {
        console.log('in then', response);
        this.setState({
          userCreate: response.data.username,  // confirmation creation user 
          username: "",
          password: ""
        });
      })
      .catch(err => {
        console.log('in error', err)
        this.setState({ err: 'User already exists' });
      });
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
      <AdminLayout />
      <div className="wrapper">
        <div className="register">
          <h1 className="reg">New User</h1>
          <form onSubmit={this.handleOnSubmit}>
            <input
              name="username"
              type="text"
              placeholder="enter username"
              value={this.state.username}
              onChange={this.handleOnChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="enter password"
              value={this.state.password}
              onChange={this.handleOnChange}
              required
            />
            <button type="submit">Register</button>


            {this.state.userCreate ? (
              <div style={{ color: "white" }}>{`User ${this.state.userCreate} created`}</div>
            ) : ''}
            
            {this.state.err ? (
              <div style={{ color: "white" }}>{this.state.err}</div>
            ) : ''}
            <hr />
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default Register;
