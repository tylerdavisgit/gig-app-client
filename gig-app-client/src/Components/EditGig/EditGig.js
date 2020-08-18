import React, { useState, useEffect, useContext } from "react";
import GigForm from "../GigForm/GigForm";
import axios from "axios";
import { DataContext } from "../../App";
import { Link } from "react-router-dom";
import apiUrl from "../../apiConfig";
import "./EditGig.scss";

export default function EditGig(props) {
  const dataContext = useContext(DataContext);

  console.log("edit gig data context", dataContext);

  const setUserGigs = dataContext.setUserGigs;

  const user_id = dataContext.activeUser.user.id;

  let path = props.location.pathname;

  let gig_id = path
    .split("")
    .splice(15, path.length - 1)
    .join("");

  const [gigInput, setGigInput] = useState({
    title: "",
    client: "",
    client_contact: "",
    location: "",
    date: "",
    price: "",
    time: "",
  });

  useEffect(() => {
    const makeGigApiCall = async () => {
      await axios.get(`${apiUrl}/gigs/${gig_id}`).then((res) => {
        setGigInput(res.data);
      });
    };
    makeGigApiCall();
  }, [gig_id]);

  const handleGigChange = (event) => {
    console.log(event.target.value);
    setGigInput({
      ...gigInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleGigSubmit = (event) => {
    event.preventDefault();
    console.log("handle gig submit");
    axios
      .put(`${apiUrl}/users/${user_id}/gigs/${gig_id}`, gigInput)
      .then((res) => {
        console.log("update res", res);
        setGigInput({
          title: "",
          client: "",
          client_contact: "",
          location: "",
          date: "",
          price: "",
          time: "",
        });
        const reloadGigs = async () => {
          await axios.get(`${apiUrl}/users/${user_id}/gigs`).then((res) => {
            console.log("res from RELOAD GIGS", res);
            setUserGigs(res.data);
          });
        };
        reloadGigs();
      })
      .catch(console.error);

    props.history.push("/month");
  };

  const handleGigDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`${apiUrl}/gigs/${gig_id}`)
      .then(props.history.push("/month"))
      .then((res) => {
        console.log("DELETED GIG");
        const reloadGigs = async () => {
          await axios.get(`${apiUrl}/users/${user_id}/gigs`).then((res) => {
            console.log("res from RELOAD GIGS", res);
            setUserGigs(res.data);
          });
        };
        reloadGigs();
      });
  };

  return (
    <div id="edit-gig-wrapper">
      <h1>EDIT GIG</h1>
      <h5>* Indicates a required field</h5>
      <GigForm
        gigInput={gigInput}
        handleGigChange={handleGigChange}
        handleGigSubmit={handleGigSubmit}
      />
      <div id="edit-footer">
        <Link to="/month">Cancel</Link>
        <button onClick={handleGigDelete}>Delete Gig</button>
      </div>
    </div>
  );
}
