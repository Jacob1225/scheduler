import React from "react";  
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

//--------APPLICATION COMPONENT THAT IS THE TOP LEVEL COMPONENT FOR THE APP---------------------
export default function Application(props) {
  const {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  

  const interviewers = getInterviewersForDay(state, state.day)
  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
    
    //------RETURNING THE DIFFERENT APPOINTMENTS FOR EACH DAY------------------
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  
  //--------------RETURNING THE HTML THAT INCLUDES ALL THE CHILD COMPONENTS OF THE APPLICATION-----------
  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu"><DayList
  days={state.days}
  day={state.day} 
  setDay={setDay}
/></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
  
}
