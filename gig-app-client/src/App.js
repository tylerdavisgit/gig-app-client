import React, { useState, createContext } from "react";
import "./App.css";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import { Switch, Route, withRouter } from "react-router-dom";
import Signup from "./Components/Auth/Signup";

export const DataContext = createContext();

function App() {
  const [activeUser, setActiveUser] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {},
  });

  return (
    <div className="App">
      <Switch>
        <DataContext.Provider value={{ activeUser, setActiveUser }}>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard">
            {activeUser.loggedInStatus === "NOT_LOGGED_IN" ? (
              <Home />
            ) : (
              <Dashboard />
            )}
          </Route>
          <Route exact path="/signup">
            {activeUser.loggedInStatus === "LOGGED_IN" ? (
              <Dashboard />
            ) : (
              <Signup />
            )}
          </Route>
        </DataContext.Provider>
      </Switch>
    </div>
  );
}

export default withRouter(App);
