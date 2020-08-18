import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../App";
import apiUrl from "../../apiConfig";
import "./Login.scss";

export default function Login(props) {
  const dataContext = useContext(DataContext);
  const activeUser = dataContext.activeUser;
  const setActiveUser = dataContext.setActiveUser;

  const [input, setInput] = useState({
    email: "",
    password: "",
    LoginErrors: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${apiUrl}/sessions`,
        {
          user: {
            email: input.email,
            password: input.password,
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("res from login - ", res);
        setActiveUser({
          loggedInStatus: "LOGGED_IN",
          user: res.data.user,
        });
        props.history.push("/month");

        setInput({
          email: "",
          password: "",
          LoginErrors: "",
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

  if (activeUser.user.email) {
    return <Redirect to="/month" />;
  } else {
    return (
      <div id="login-wrapper">
        <div>
          <h1>GIG</h1>
          <h2> Login</h2>
          <h5>Or click sign up to get started</h5>
          <div>
            <form id="login-form" onSubmit={handleSubmit}>
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
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }
}
