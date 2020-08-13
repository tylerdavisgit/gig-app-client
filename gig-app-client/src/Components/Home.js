import React, { useContext } from "react";
import { DataContext } from "../App";
import { withRouter, Redirect } from "react-router-dom";

const Home = () => {
  const dataContext = useContext(DataContext);
  console.log(dataContext);
  const activeUser = dataContext.activeUser.user;
  console.log(activeUser);

  return <Redirect to="/login" />;
};

export default withRouter(Home);
