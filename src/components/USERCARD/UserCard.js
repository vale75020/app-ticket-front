import React, { Component } from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid white;
  border-radius: 15px;
  overflow: hidden;
`;

const CardTitle = styled.h2`
  background-color: #2c3e50;
  width: 100%;
  margin: 0 auto;
  font-size: 16px;
  color: white;
  padding: 5px 0;
`;

const CardTitle2 = styled(CardTitle)`
  background-color: #e67e22;
  text-transform: uppercase;
`;

const CardText = styled.div`
  width: 90%;
  color: black;
  font-size: 12px;
  background-color: white;
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "50px")};
  height: auto;
  overflow: hidden;
  padding: 5%;
`;

const CardActions = styled.div`
  background-color: #2c3e50;
  color: white;
  bottom: 0;
  padding: 5px;
  display: flex;
  justify-content: space-around;
`;

const ButtonShow = styled.div`
  color: white;
  border: 3px solid white;
  border-radius: 10px;
  margin: 0 5px;
  width: 40%;
  height: 40px;
  font-size: 18px;
  line-height: 40px;
`;

const ButtonDelete = styled(ButtonShow)`
  color: red;
  border: 3px solid red;
`;

class UserCardStyled extends Component {
  state = {
    isOpen: false
  };

  showDetails = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    console.log("local storage isAdmin", !!(localStorage.getItem("isAdmin")==="true"));
    const { title, text, status, id, onDelete, changeStatus } = this.props;

    return (
      <Card>
        <CardTitle>{title}</CardTitle>
        {localStorage.getItem("isAdmin") === "true"
        ? (<CardTitle2 onClick={() => {changeStatus(id);}}>{status}<img src="/images/arrow.svg" alt="arrow" style={{height:"14px",marginLeft:"20px"}}/></CardTitle2>) 
        : (<CardTitle2>{status}</CardTitle2>)}
        <CardText isOpen={this.state.isOpen}>{text}</CardText>
        <CardActions>
          <ButtonShow onClick={this.showDetails}>View</ButtonShow>
          <ButtonDelete onClick={() => onDelete(id)}>Remove</ButtonDelete>
        </CardActions>
      </Card>
    );
  }
}

export default UserCardStyled;
