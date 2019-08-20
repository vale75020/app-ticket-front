import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/LOGIN/Login";
import AdminCards from "./components/ADMINCARDS/AdminCards";
import "./App.css";
import UserCards from "./components/USERCARDS/UserCards";
import Register from "./components/REGISTER/Register";
import NewCard from "./components/NEWCARD/NewCard";
import { PrivateRoute } from "./components/PrivateRoute";
import { Page404 } from "./components/404";
import setAuthToken from "./components/utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/all" component={AdminCards} />
        <PrivateRoute exact path="/mycards" component={UserCards} />
        <PrivateRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/newcard" component={NewCard} />
        <Route component={Page404} />
      </Switch>
    </div>
  );
};

export default App;
