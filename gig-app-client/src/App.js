import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import Home from "./Components/Home";
import axios from "axios";
import Dashboard from "./Components/Dashboard";
import { Switch, Route, withRouter } from "react-router-dom";
import Signup from "./Components/Auth/Signup";

export const DataContext = createContext();

function App() {
  const [activeUser, setActiveUser] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {},
  });

  const checkLoginStatus = () => {
    axios
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
        } else if (
          !res.data.logged_in &&
          activeUser.loggedInStatus === "LOGGED_IN"
        ) {
          setActiveUser({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
          });
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  };

  useEffect(() => {
    checkLoginStatus();
  });

  return (
    <div className="App">
      <Switch>
        <DataContext.Provider value={{ activeUser, setActiveUser }}>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/signup" component={Signup} />
        </DataContext.Provider>
      </Switch>
    </div>
  );
}

export default withRouter(App);
