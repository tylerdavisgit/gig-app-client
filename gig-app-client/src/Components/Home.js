import React from "react";

import { withRouter, Redirect } from "react-router-dom";

const Home = () => {
  return <Redirect to="/login" />;
};

export default withRouter(Home);
