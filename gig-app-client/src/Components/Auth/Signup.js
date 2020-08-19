import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../App";
import axios from "axios";
import apiUrl from "../../apiConfig";
import "./Signup.scss";

export default function Signup(props) {
  const dataContext = useContext(DataContext);
  const setActiveUser = dataContext.setActiveUser;

  const [input, setInput] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    registrationErrors: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${apiUrl}/registrations`,
        {
          user: {
            email: input.email,
            password: input.password,
            email_confirmation: input.email_confirmation,
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        setActiveUser({
          loggedInStatus: "LOGGED_IN",
          user: res.data.user,
        });
        props.history.push("/month");

        setInput({
          email: "",
          password: "",
          password_confirmation: "",
          registrationErrors: "",
        });
      })
      .catch(console.error);
  };

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div id="signup-wrapper">
      <h1>GIG</h1>
      <h2>Sign Up</h2>
      <form id="signup-form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          value={input.email}
          required
        />

        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          value={input.password}
          required
        />
        <input
          onChange={handleChange}
          type="password_confirmation"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={input.password_confirmation}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/">Cancel</Link>
    </div>
  );
}
