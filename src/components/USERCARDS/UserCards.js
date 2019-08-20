import React, { Component } from "react";
//import cardTab from "../cardTab";
import UserCard from "../USERCARD/UserCard";
import UserLayout from "../USERLAYOUT/UserLayout";
import axios from "axios";
import styled from "styled-components";

const CellUser = styled.div`
  width: 320px;
  margin: 10px auto;
`;

const GridUser = styled.div`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  min-width: 300px;
  margin: 0 auto;
  width: 90%;
  margin: 0 5%;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-family: Permanent Marker, cursive;
`;

export default class UserCards extends Component {
  state = {
    cards: [],
    isUser: false
  };

  componentWillMount() {
    axios
      .get("https://app-ticket-back.herokuapp.com/mycards")
      .then(response => {
        console.log("response usercards", response);
        this.setState({
          cards: response.data
        });
        localStorage.token && this.setState({ isUser: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete = id => {
    //console.log(id);
    axios
      .delete(`https://app-ticket-back.herokuapp.com/${id}`, {})
      .then(response => {
        alert("card deleted");
        // this.setState({ cards: this.state.cards })
        this.componentWillMount();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const displayCards = this.state.cards.map(card => (
      <CellUser key={card._id}>
        <UserCard
          key={card._id}
          id={card._id}
          title={card.title}
          text={card.text}
          status={card.status}
          onDelete={this.handleDelete}
        />
      </CellUser>
    ));
    return (
      <div>
        <UserLayout />
        <Title>User Cards</Title>
        <GridUser>{displayCards}</GridUser>
      </div>
    );
  }
}
