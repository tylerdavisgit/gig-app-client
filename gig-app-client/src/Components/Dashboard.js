import React, { useContext } from "react";
import { DataContext } from "../App";
import axios from "axios";

export default function Dashboard(props) {
  const dataContext = useContext(DataContext);
  const activeUser = dataContext.activeUser.user;
  const setActiveUser = dataContext.setActiveUser;
  let email = activeUser.email;

  const handleLogout = async () => {
    await axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((res) => {
        console.log("LOGGED OUT");
        setActiveUser({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {},
        });
        props.history.push("/");
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Logged in with: {email} </h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
