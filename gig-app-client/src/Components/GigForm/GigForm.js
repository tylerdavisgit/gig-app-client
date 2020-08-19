import React from "react";
import "./GigForm.scss";

export default function GigForm({
  handleGigChange,
  handleGigSubmit,
  gigInput,
}) {
  return (
    <div id="gig-form-wrapper">
      <form onSubmit={handleGigSubmit}>
        <label>Title*:</label>
        <input
          onChange={handleGigChange}
          name="title"
          value={gigInput.title}
          required
        />
        <label>Client:</label>

        <input
          onChange={handleGigChange}
          name="client"
          value={gigInput.client}
        />
        <label>Contact:</label>

        <input
          onChange={handleGigChange}
          name="client_contact"
          value={gigInput.client_contact}
        />
        <label>Location*:</label>

        <input
          onChange={handleGigChange}
          name="location"
          value={gigInput.location}
          required
        />
        <label>Date Format(YYYY-MM-DD)*:</label>

        <input
          onChange={handleGigChange}
          name="date"
          value={gigInput.date}
          required
        />
        <label>Price*:</label>

        <input
          onChange={handleGigChange}
          name="price"
          value={gigInput.price}
          required
        />
        <label>Time:</label>

        <input onChange={handleGigChange} name="time" value={gigInput.time} />
        <input id="submit" type="submit" value="Save Gig" />
      </form>
    </div>
  );
}
