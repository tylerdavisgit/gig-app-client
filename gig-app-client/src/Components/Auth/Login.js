import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../App";

export default function Login(props) {
  const dataContext = useContext(DataContext);
  const activeUser = dataContext.activeUser;
  const setActiveUser = dataContext.setActiveUser;

  const [input, setInput] = useState({
    email: "",
    password: "",
    LoginErrors: "",
  });

  const handleLogout = async () => {
    await axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((res) => {
        console.log("LOGGED OUT");
      })
      .catch((error) => {
        console.log("logout error", error);
      });
    setActiveUser({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/sessions",
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
      <div>
        <div>
          <h1>Gig</h1>
          <h2> Login</h2>
          <h5>Or click sign up to get started</h5>
          <p>Logged in status: {activeUser.loggedInStatus}</p>
          <p>Logged in as: {activeUser.user.email}</p>
          <div>
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
              <button type="submit">Login</button>
              <button onClick={handleLogout}>Logout</button>
            </form>
          </div>

          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }
}
