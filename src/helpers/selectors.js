export function getAppointmentsForDay(state, day) {
    const filteredDay = state.days.filter(dayObj => day === dayObj.name);  
    if (filteredDay.length === 0) {
      return [];
    } else {
    let appointmentIds = filteredDay[0].appointments;
    let appointmentsForDay = []
    const keys = Object.keys(state.appointments)
    
    for (let id of appointmentIds) {

        if (keys.includes(id.toString())) {
          appointmentsForDay.push(state.appointments[id])
        }
    }
    return appointmentsForDay;
  }
};

export function getInterview(state, interview) {
    const keys = Object.keys(state.interviewers);
    let interviewData = {}; 
    
    if (interview) {
      if (keys.includes(interview.interviewer.toString())) {
       return interviewData = { "student" : interview.student, "interviewer": state.interviewers[interview.interviewer.toString()]}
      } 
    } else {
      return null;
    }
};

