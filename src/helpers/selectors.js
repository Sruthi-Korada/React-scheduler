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
  