//---------HELPER FUNCTIONS TO BE USED IN THE APPLICATION COMPONENT ------------

//--------FUNCTION THAT RETURNS THE APPOINTMENTS FOR A SPECIFIC DAY THAT IS PASSED AS AN ARGUMENT------------
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

//----------FUNCTION THAT RETURNS THE INTERVIEWS FOR A SPECIFIC DAY THAT IS PASSED AS AN ARGUMENT------------
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(dayObj => day === dayObj.name);  
  if (filteredDay.length === 0) {
    return [];
  
  } else {
  let interviewerIds = filteredDay[0].interviewers;
  let interviewersForDay = []
  const keys = Object.keys(state.interviewers)
  
  for (let id of interviewerIds) {

      if (keys.includes(id.toString())) {
        interviewersForDay.push(state.interviewers[id])
      }
  }

  return interviewersForDay;
  }
};

//---------FUNCTION THAT RETURNS AN OBJECT WITH THE INTERVIEWER DATA----------
export function getInterview(state, interview) {
  if (interview === null) {
    return null
  }
  const obj = {...interview}
  const id = obj.interviewer
  const interviewMatch = Object.values(state.interviewers).filter((interview) => interview.id === id)[0]
  obj.interviewer = interviewMatch
  
  return obj
}
