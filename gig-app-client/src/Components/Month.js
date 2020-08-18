import * as React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { DataContext } from "../App";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  box-shadow: 2px 2px 2px #eee;
  background-image: radial-gradient(ellipse, rgb(78, 29, 29), rgb(25, 25, 25));
  color: white;
  font-family: futura;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  justify-items: center;
`;

const Header = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 10px 10px 5px 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  height: 10vh;
  #header-year {
    font-size: 25px;
  }
  #gigs {
    margin-top: 5px;
  }
  a {
    color: white;
    text-decoration: none;
    font-size: 40px;
  }
  #burger {
    display: flex;
    flex-direction: column;
    .burger-span {
      width: 30px;
      height: 2px;
      border: 2px solid white;
      background-color: white;
      margin-top: 5px;
    }
  }
`;

const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const Body = styled.div`
  width: 97%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1%;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const Day = styled.div`
  width: 100%;
  position: relative;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid lightgray;
  font-size: 14px;
  .days-of-week {
    font-size: 20px;
  }
  .calendar-nums {
    font-size: 1em;
    margin-right: -45%;
    margin-top: -30%;
    color: white;
  }
  p {
    color: white;
  }

  ${(props) =>
    props.isToday &&
    css`
      border: 2px solid black;
    `}
`;

const Gig = styled.div`
  position: absolute;
  top: 33%;
  left: 0;
  width: 100%;
  opacity: 0.8;
  font-weight: bold;
  text-shadow: 1px 0.5px 0.5px darkgrey;
  text-align: left;
  color: black;
  cursor: pointer;
  border-radius: 2px;
  font-size: 1em;
  z-index: 10000;
  background-color: lightgrey;
  font-size: 0.6em;
  overflow: hidden;
  .gig-title {
    display: flex;
    flex-wrap: no-wrap;
    flex-direction: row;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px;
  height: 20%;
  margin-bottom: 10px;
  margin-top: auto;
  a {
    text-decoration: none;
    color: white;
    font-size: 20px;
    border: 2px solid white;
    background-color: black;
    border-radius: 35px;
    width: 100px;
    padding-top: 12px;
  }
`;

const PrevButton = styled.div`
  cursor: pointer;
  font-size: 60px;
  height: 50px;
  width: 50px;
  border: 3px solid white;
  border-radius: 30px;
  div {
    margin-top: -24px;
  }
`;

const NextButton = styled.div`
  cursor: pointer;
  font-size: 35px;
  height: 50px;
  width: 50px;
  border: 3px solid white;
  border-radius: 30px;
  div {
    margin-top: 2px;
  }
`;

export default function Month() {
  const dataContext = useContext(DataContext);

  console.log(dataContext);

  const gigs = dataContext.userGigs;

  console.log(gigs);

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

  console.log(finalGigs);

  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const leapDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  const getMonthlyTotal = (finalGigs) => {
    let monthlyTotal = 0;
    for (let i = 0; i < finalGigs.length; i += 1) {
      console.log(finalGigs[i]);

      if (
        finalGigs[i].date[0] === date.getFullYear() &&
        finalGigs[i].date[1] === date.getMonth() + 1
      ) {
        monthlyTotal = monthlyTotal + finalGigs[i].price;
        console.log(monthlyTotal);
      }
    }
    return monthlyTotal;
  };

  let monthlyTotal = getMonthlyTotal(finalGigs);

  function getStartDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const monthDays = isLeapYear(date.getFullYear()) ? leapDays : days;

  return (
    <Wrapper>
      <Header>
        <Link to="/gigs/create_gig">+</Link>
        <div>
          <div id="header-month">
            {months[month]} {year}
          </div>
          <div id="gigs">Gigs ${monthlyTotal}</div>
          <div id="header-year"></div>
        </div>
        <Link to="/dashboard">
          <div id="burger">
            <span className="burger-span" />
            <span className="burger-span" />
            <span className="burger-span" />
          </div>
        </Link>
      </Header>
      <CalendarWrapper>
        <Body>
          {daysOfWeek.map((d) => (
            <Day key={d}>
              <p className="days-of-week">{d}</p>
            </Day>
          ))}
          {Array(monthDays[month] + startDay)
            .fill()
            .map((_, index) => {
              const d = index - (startDay - 1);
              const date = new Date(year, month, d);
              let matchingDatesPrice = [];
              let matchingDatesTitle = [];
              let matchingDatesId = [];
              finalGigs.map((gig) => {
                if (
                  gig.date[2] === date.getDate() &&
                  gig.date[1] === date.getMonth() + 1 &&
                  gig.date[0] === date.getFullYear()
                ) {
                  matchingDatesPrice.push("$" + gig.price);
                  matchingDatesTitle.push(gig.title);
                  matchingDatesId.push(gig.id);
                }
              });
              let url = `/gigs/edit_gig/${matchingDatesId}`;

              return (
                <>
                  <Day key={index} isToday={d === today.getDate()}>
                    <div className="calendar-nums">
                      {d > 0 && d < 32 ? d : ""}

                      {matchingDatesId ? (
                        <Link to={url}>
                          <Gig value={matchingDatesId}>
                            <div className="gig-title">
                              {matchingDatesTitle}
                            </div>
                            <div className="gig-price">
                              {matchingDatesPrice}
                            </div>
                          </Gig>
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  </Day>
                </>
              );
            })}
        </Body>
      </CalendarWrapper>

      <Footer>
        <PrevButton
          id="prev-month"
          onClick={() => setDate(new Date(year, month - 1, day))}
        >
          <div>-</div>
        </PrevButton>

        <Link to="/gigs">All Gigs</Link>

        <NextButton
          id="next-month"
          onClick={() => setDate(new Date(year, month + 1, day))}
        >
          <div>+</div>
        </NextButton>
      </Footer>
    </Wrapper>
  );
}
