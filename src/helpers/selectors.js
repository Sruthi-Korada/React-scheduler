export function getAppointmentsForDay(state, day) {
  let aptArr = [];
  for (let date of state.days) {
    if (date.name === day) {
      aptArr.push(...date.appointments);
    }
  }
  let appointmentsArr = [];
  for (let aptObj in state.appointments) {
    for (let id of aptArr) {
      if (id === parseInt(aptObj)) {
        appointmentsArr.push(state.appointments[aptObj])
      }
    }
  }
  return appointmentsArr;
}
// Gets an interview
export function getInterview(state, interview) {
        let interviewObj = null;
        if (interview) {
          interviewObj = {...interview, interviewer: state.interviewers[interview.interviewer]};
        }
        return interviewObj;
      }
      export function getInterviewersForDay(state, day) {
        const filteredDays = state.days.filter((singleDay) => {
          return singleDay.name === day
          })
        if (filteredDays.length === 0) {
          return [];
        }
        const interviewersMapped = filteredDays[0].interviewers.map((int) => {
          return state.interviewers[int]
        })
        return interviewersMapped;
      }