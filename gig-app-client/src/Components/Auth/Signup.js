import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../App";
import axios from "axios";

export default function Signup(props) {
  const dataContext = useContext(DataContext);
  const activeUser = dataContext.activeUser;
  const setActiveUser = dataContext.setActiveUser;
  console.log(activeUser.loggedInStatus);
  console.log(activeUser.user);

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
        "http://localhost:3000/registrations",
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
        console.log(res);
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
    console.log(event.target.value);
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Sign Up!</button>
        <Link to="/">Cancel</Link>
      </form>
    </div>
  );
}
