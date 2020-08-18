import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../App";
import "./GigList.scss";

export default function GigList(props) {
  const dataContext = useContext(DataContext);

  console.log(dataContext);

  const gigs = dataContext.userGigs;

  console.log(gigs);
  const today = new Date();

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

  let path = props.location.pathname;
  console.log(path);

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

  console.log(finalGigs);
  return (
    <div id="giglist-wrapper">
      <div id="gigs-list-header">
        <h1>YOUR GIGS</h1>
        <div id="gig-list-links">
          <Link to="month">CALENDAR</Link>
          <Link to="/gigs/create_gig/">+</Link>
        </div>

        <h3 id="gigs-sub-header">Gig Income Booked:</h3>
        <h2>${yearlyTotal}</h2>
      </div>

      <ul id="gig-list-ul">
        {finalGigs.map((gig) => {
          let url = `/gigs/edit_gig/${gig.id}`;
          return (
            <li key={gig.id} className="gig-card-wrapper">
              <div className="li-section">
                <h3>Gig:</h3>
                <h3>{gig.title}</h3>
              </div>
              <div className="li-section">
                <h3>Client</h3>
                <h3>{gig.client}</h3>
              </div>
              <div className="li-section">
                <h3>Contact:</h3>
                <h3>{gig.client_contact}</h3>
              </div>
              <div className="li-section">
                <h3>Date:</h3>
                <h3>
                  {gig.date[1]}/{gig.date[2]}/{gig.date[0]}
                </h3>
              </div>
              <div className="li-section">
                <h3>Location:</h3>
                <h3>{gig.location}</h3>
              </div>
              <div className="li-section">
                <h3>Time:</h3>
                <h3>{gig.time}</h3>
              </div>
              <div className="li-section">
                <h3>Price:</h3>
                <h3>${gig.price}</h3>
              </div>
              <Link key={gig.id} to={url}>
                Edit/Delete Gig
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
