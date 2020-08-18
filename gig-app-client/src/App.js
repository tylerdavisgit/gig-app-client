import React, { useState, createContext, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import { Switch, Route, withRouter } from "react-router-dom";

import Home from "./Components/Home";
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import Month from "./Components/Month";
import Dashboard from "./Components/Dashboard/Dashboard";
import apiUrl from "./apiConfig";
import GigList from "./Components/GigList/GigList";
import EditGig from "./Components/EditGig/EditGig";
import CreateGig from "./Components/CreateGig/CreateGig";

export const DataContext = createContext();

function App() {
  const checkLoginStatus = async () => {
    await axios
      .get(`${apiUrl}/logged_in`, { withCredentials: true })
      .then((res) => {
        console.log(res);
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

  console.log(activeUser);

  const [userGigs, setUserGigs] = useState([]);

  console.log("userGigs from app -", userGigs);

  return (
    <div className="App">
      <Switch>
        <DataContext.Provider
          value={{
            activeUser,
            setActiveUser,
            userGigs,
            setUserGigs,
          }}
        >
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/month" component={Month} />
          <Route exact path="/gigs" component={GigList} />
          <Route exact path="/gigs/edit_gig/:gig_id" component={EditGig} />
          <Route exact path="/gigs/create_gig/" component={CreateGig} />
        </DataContext.Provider>
      </Switch>
    </div>
  );
}

export default withRouter(App);
