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
  const setUserGigs = dataContext.setUserGigs;

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
        setActiveUser({
          loggedInStatus: "LOGGED_IN",
          user: res.data.user,
        });
        const reloadGigs = async () => {
          await axios
            .get(`${apiUrl}/users/${res.data.user.id}/gigs`)
            .then((res) => {
              setUserGigs(res.data);
            });
        };
        reloadGigs();
        props.history.push("/month");
      })
      .catch(console.error);
  };

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  if (!activeUser.user.email) {
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
  } else {
    return <Redirect to="/month" />;
  }
}
