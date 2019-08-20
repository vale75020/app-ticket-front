import React, { Component } from "react";
import "./newCard.css";
import axios from "axios";
import AdminLayout from "../ADMINLAYOUT/AdminLayout";
import UserLayout from "../USERLAYOUT/UserLayout";

class NewCard extends Component {
  state = {
    cardCreate: "",
    err: "",
    title: "",
    text: "",
    status: ""
  };

  handleOnSubmit = e => {
    // envoier à la bdd les info de la card
    e.preventDefault();

    const newCard = {
      // new card
      title: this.state.title,
      text: this.state.text
    };
    console.log(newCard);
    axios
      .post("http://localhost:3333/add", newCard) // post pour registrer les données
      .then(response => {
        console.log("in then", response);
        this.setState({
          cardCreate: "La carte a été créée", // confirmation creation card
          title: "",
          text: "",
          status: "",
          err: ""
        });
      })
      .catch(err => {
        this.setState({
          err: "La card existe deja",
          cardCreate: ""
        });
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
        {localStorage.isAdmin === "true" ? <AdminLayout /> : <UserLayout />}
        <div className="wrapper">
          <div className="register">
            <h1 className="reg">New Card</h1>
            <form onSubmit={this.handleOnSubmit}>
              <input
                name="title"
                type="text"
                placeholder="enter title"
                value={this.state.title}
                onChange={this.handleOnChange}
                required
              />
              <textarea
                name="text"
                type="text"
                placeholder="enter text"
                value={this.state.text}
                onChange={this.handleOnChange}
                required
              />
              <button type="submit">Register</button>

              {this.state.cardCreate ? (
                <div style={{ color: "white" }}>La card a été crée</div>
              ) : (
                ""
              )}

              {this.state.err ? (
                <div style={{ color: "white" }}>{this.state.err}</div>
              ) : (
                ""
              )}
              <hr />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewCard;
