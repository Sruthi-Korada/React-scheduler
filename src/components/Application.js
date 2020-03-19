import React, { useState } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";
export default function Application(props) {
  const setDay = days => setState(prev => ({ ...prev, days }));
  const [state, setState] = useState({
    day: "Thursday",
    days: [],
    appointments: {}
  });
  const promiseDays = axios.get("http://localhost:8001/api/days");
  const promiseApps = axios.get("http://localhost:8001/api/appointments");
  const promiseInterviewers = axios.get(
    "http://localhost:8001/api/interviewers"
  );
  Promise.all([promiseDays, promiseApps, promiseInterviewers]).then(res => {
    setState(prev => ({
      ...prev,
      days: res[0].data,
      appointments: res[1].data,
      interviews: res[2].data
    }));
  });
  const appointments = getAppointmentsForDay(state, state.day);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(appointment => (
          <Appointment key={appointment.id} interview={appointment.interview} {...appointment} />
        ))}
      </section>
    </main>
  );
}