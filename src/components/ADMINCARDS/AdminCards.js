import React, { Component } from "react";
import UserCard from "../USERCARD/UserCard";
import AdminLayout from "../ADMINLAYOUT/AdminLayout";
import "./AdminCards.css";
import axios from "axios";
import styled from "styled-components";



const Container = styled.div`
  width: "90%";
  height: auto;
  font-size: 20px;
  padding: 0;
  margin: 20px auto;
`;

const Grid = styled.div`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  min-width: 300px;
  margin: 0 auto;
`;

const Cell = styled.div`
  min-width: 280px;
  width: 22%;
  margin: 10px auto;
`;

class AdminCards extends Component {
  state = {
    cards: [],
    statuses : ["to validate", "to do", "doing", "done"]
  };

  componentWillMount() {
    axios
      .get("https://app-ticket-back.herokuapp.com/all")
      .then(response => {
        console.log("response usercards", response);
        this.setState({
          cards: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete = id => {
    console.log(id);
    axios
      .delete(`https://app-ticket-back.herokuapp.com/${id}`, {})
      .then(response => {
        alert("card deleted");
        this.componentWillMount();
      })
      .catch(error => {
        console.log(error);
      });
  };

  changeStatus = (cardId) => {
    var statusCard;
    this.setState({
      cards: this.state.cards.map(x => {
        const previousIndex = this.state.statuses.findIndex(y => y === x.status)
        if (cardId === x._id) {
          statusCard = this.state.statuses[(previousIndex+1)%4]
        }
        return cardId === x._id ? { ...x, status: statusCard } : x 
      })
    }, () => {
      axios
      .put(`https://app-ticket-back.herokuapp.com/${cardId}`, { status : statusCard  })
      .then(response => {
        console.log("card updated posted to back, response", response);
      })
      .catch(error => {
        console.log(error);
      });
    })
  };


  render() {
    const displayStatus = {};
    this.state.statuses.forEach(status => {
      displayStatus[status] = this.state.cards
        .filter(card => card.status === status)
        .map(card => (
          <UserCard
            key={card._id}
            id={card._id}
            title={card.title}
            text={card.text}
            status={card.status}
            onDelete={this.handleDelete}
            changeStatus={this.changeStatus}
          />
        ));
    });

    return (
      <div>
        <AdminLayout />
        <h2 style={{ fontFamily: "Permanent Marker, cursive" }}>Admin Cards</h2>

        <Container>
          <Grid>
          {this.state.statuses.map((status, index) => {
              return (
              <Cell key={index} className="column" id={index}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {displayStatus[status]}
             </Cell>
            )})
          }
          </Grid>
        </Container>
      </div>
    );
  }
}

export default AdminCards;
