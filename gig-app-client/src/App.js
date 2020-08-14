import React, { useState, createContext, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import { Switch, Route, withRouter } from "react-router-dom";

import Home from "./Components/Home";
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import Month from "./Components/Month";
import Dashboard from "./Components/Dashboard";

export const DataContext = createContext();

function App() {
  const checkLoginStatus = async () => {
    await axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then((res) => {
        if (
          res.data.logged_in &&
          activeUser.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          setActiveUser({
            loggedInStatus: "LOGGED_IN",
            user: res.data.user,
          });
          setUserGigs(res.data.user.gigs);
        } else if (
          !res.data.logged_in &&
          activeUser.loggedInStatus === "LOGGED_IN"
        ) {
          setActiveUser({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
          });
        }
        console.log("within app, within checkLoginStatus:", activeUser);
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  };

  useEffect(() => {
    checkLoginStatus();
  });

  const [activeUser, setActiveUser] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {},
  });

  const [userGigs, setUserGigs] = useState([]);

  return (
    <div className="App">
      <Switch>
        <DataContext.Provider value={{ activeUser, setActiveUser, userGigs }}>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/month" component={Month} />
        </DataContext.Provider>
      </Switch>
    </div>
  );
}

export default withRouter(App);
