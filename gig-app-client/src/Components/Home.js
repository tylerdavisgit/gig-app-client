import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../App";

export default function Home() {
  const dataContext = useContext(DataContext);
  return (
    <div>
      <h1>Gig</h1>
      <h3> Login or Sign Up:</h3>
      <div> *Login goes here*</div>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
