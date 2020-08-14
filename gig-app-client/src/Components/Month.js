import * as React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { DataContext } from "../App";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  box-shadow: 2px 2px 2px #eee;
  background-color: black;
  color: lightgrey;
  font-family: helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    color: lightgrey;
    text-decoration: none;
    font-size: 40px;
  }
  #burger {
    display: flex;
    flex-direction: column;
    .burger-span {
      width: 30px;
      height: 2px;
      border: 2px solid lightgrey;
      background-color: lightgrey;
      margin-top: 5px;
    }
  }
`;

const CalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  width: 97%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1%;
  justify-content: center;
  align-items: center;
`;

const Day = styled.div`
  width: 100%;
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
    font-size: 8px;
    margin-left: 20px;
    margin-bottom: 20px;
  }

  ${(props) =>
    props.isToday &&
    css`
      border: 2px solid black;
    `}

  ${(props) =>
    props.isSelected &&
    css`
      background-color: lightgrey;
      color: black;
    `}
`;

const Gig = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid lightgray;
  font-size: 14px;
  z-index: 10000;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  height: 20%;
  margin-bottom: 20px;
  margin-top: auto;
`;

const PrevButton = styled.div`
  cursor: pointer;
  font-size: 60px;
  height: 50px;
  width: 50px;
  border: 3px solid lightgray;
  div {
    margin-top: -14px;
  }
`;

const NextButton = styled.div`
  cursor: pointer;
  font-size: 35px;
  height: 50px;
  width: 50px;
  border: 3px solid lightgray;
  div {
    margin-top: 2px;
  }
`;

export default function Calendar() {
  const dataContext = useContext(DataContext);
  // const activeUser = dataContext.activeUser;

  const gigs = dataContext.userGigs;
  console.log(gigs[3]);

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
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();
  const [date, setDate] = useState(today);
  const [dateSelected, setDateSelected] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  console.log(dateSelected);
  console.log(dateSelected.getMonth(dateSelected) + 1);
  console.log(dateSelected.getFullYear(dateSelected));
  console.log(dateSelected.getDate(dateSelected));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

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
        <Link to="/dashboard">+</Link>
        <div>
          <div id="header-month">
            {months[month]} {year}
          </div>
          <div id="gigs">Gigs $</div>
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
              return (
                <Day
                  key={index}
                  isToday={d === today.getDate()}
                  isSelected={d === dateSelected}
                  onClick={() => setDateSelected(new Date(year, month, d))}
                >
                  <div className="calendar-nums">
                    {d > 0 && d < 32 ? d : ""}
                  </div>
                </Day>
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
