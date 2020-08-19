import React, { useState, useContext } from "react";
import GigForm from "../GigForm/GigForm";
import axios from "axios";
import { DataContext } from "../../App";
import { Link } from "react-router-dom";
import apiUrl from "../../apiConfig";
import "./CreateGig.scss";

export default function CreateGig(props) {
  const dataContext = useContext(DataContext);

  const setUserGigs = dataContext.setUserGigs;

  const user_id = dataContext.activeUser.user.id;

  const [gigInput, setGigInput] = useState({
    title: "",
    client: "",
    client_contact: "",
    location: "",
    date: "",
    price: "",
    time: "",
  });

  const handleGigChange = (event) => {
    setGigInput({
      ...gigInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleGigSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${apiUrl}/users/${user_id}/gigs/`, gigInput)
      .then((res) => {
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
            setUserGigs(res.data);
          });
        };
        reloadGigs();
        props.history.push("/month");
      })
      .catch(console.error);
  };

  return (
    <div id="edit-gig-wrapper">
      <h1>CREATE GIG</h1>
      <h5>* Indicates a required field</h5>
      <div id="create-form-wrapper">
        <GigForm
          gigInput={gigInput}
          handleGigChange={handleGigChange}
          handleGigSubmit={handleGigSubmit}
        />
        <Link to="/month">Cancel</Link>
      </div>
    </div>
  );
}
