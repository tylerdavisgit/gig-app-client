import React, { useContext } from "react";
import DataContext from "../App";

export default function Dashboard() {
  const dataContext = useContext(DataContext);
  const activeUser = dataContext.activeUser;

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Logged in with: {activeUser.user.email} </h2>
    </div>
  );
}
