import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../App";
import axios from "axios";
import "./Dashboard.scss";

export default function Dashboard(props) {
  const dataContext = useContext(DataContext);
  const activeUser = dataContext.activeUser.user;
  const setActiveUser = dataContext.setActiveUser;
  let email = activeUser.email;

  const today = new Date();

  const gigs = dataContext.userGigs;

  const dateParse = (gigs) => {
    const newGigs = [];

    gigs.forEach((gig) => {
      newGigs.push({
        client: gig.client,
        client_contact: gig.client_contact,
        created_at: gig.created_at,
        date: gig.date.split("-").map((numStr) => parseInt(numStr)),
        id: gig.id,
        location: gig.location,
        price: gig.price,
        time: gig.time,
        title: gig.title,
        updated_at: gig.updated_at,
        user_id: gig.user_id,
      });
    });
    return newGigs;
  };

  let finalGigs = dateParse(gigs);

  console.log(finalGigs);

  let getYearlyTotal = (finalGigs) => {
    let output = 0;

    for (let i = 0; i < finalGigs.length; i += 1) {
      console.log(finalGigs[i].date[0]);
      console.log(finalGigs[i].price);
      if (today.getFullYear() === finalGigs[i].date[0]) {
        output = output + finalGigs[i].price;
      }
    }
    return output;
  };

  let yearlyTotal = getYearlyTotal(finalGigs);

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

  let dateObj = new Date();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let year = dateObj.getFullYear();

  let newdate = month + "/" + day + "/" + year;

  return (
    <div id="dash-wrapper">
      <div id="dash-header">
        <h1>Gig Dashboard</h1>
        <Link to="/month">
          <div id="burger">
            <span className="burger-span" />
            <span className="burger-span" />
            <span className="burger-span" />
          </div>
        </Link>
      </div>
      <div id="dash-today">
        <h2>Today:</h2>
        <h3>{newdate}</h3>
      </div>
      <div id="dash-year">
        <h2>Gig Income This Year:</h2>
        <h3>${yearlyTotal}</h3>
      </div>
      <div id="dash-logged">
        <h5>Logged in with: </h5>
        <h5>{email} </h5>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
