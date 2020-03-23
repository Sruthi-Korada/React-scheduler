import { useState, useEffect } from "react";
import "components/Application.scss";
import axios from "axios";

//----------------imported to Application.js-------------------------
export default function useApplicationData() {
  const setDay = day => setState(prev => ({ ...prev, day }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //-------------------GET request with promises-------------------------
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(state => ({
        ...state,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  //--------------cancelInterview function uses promises------------------
  function cancelInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then(setState({ ...state, appointments }));
  }
  //--------------bookInterview function uses promises------------------
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(setState({ ...state, appointments }));
  }
  //------------------Change remaining days-----------------------------
  useEffect(() => {
    axios
      .get("/api/days")
      .then(days => setState(state => ({ ...state, days: days.data })));
  }, [state.appointments]);

  return { state, setDay, bookInterview, cancelInterview };
}