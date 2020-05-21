import React, {useState, useEffect} from 'react';
import axios from 'axios';

//----------CUSTOM HOOK THAT EXPORTS THE DATA USED BY THE APPLICATION COMPONENT--------------------
export default function useApplicationData() {
  const [state, setState] = useState(
    {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    });


  const setDay = day => setState({ ...state, day });

  //----------FUNCTION THAT GETS THE SPOTS REMAINING FOR THE DAY--------------
  function spotsRemaining(state) {
    let spotsAvailable = [];
    let totalDays = state.days;
    for (let day of totalDays) {
      let appointmentSlots = 0;
      for (let singleDay of day.appointments) {
        const currentAppointment = state.appointments[singleDay]
        if (currentAppointment.interview === null) {
          appointmentSlots++;
        }
      }
      spotsAvailable.push(appointmentSlots)
    }
    return spotsAvailable;
  };

  //---------FUNCTION THAT UPDATES THE SPOTS REMAINING FOR EACH DAY----------
  function updateSpots(state) {
    const spots = spotsRemaining(state)
    let newDays = []
    for (let dayIndex in spots) {
      newDays.push({ ...state.days[dayIndex], spots: spots[dayIndex]})
    }
    return { ...state, days: newDays}
  }
    
  //--------FUNCTION THAT UPDATES THE CURRENT STATE WITH THE INTERVIEW INFORMATION WHEN ONE IS ADDED-------------
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
   
    return axios.put(
      `/api/appointments/${id}`, 
      appointment
    ).then(() => {
      setState(state => updateSpots({...state, appointments: {
        ...state.appointments,
        [id]: appointment
      }}))})
  };
  
  //--------FUNCTION THAT UPDATES THE STATE SETTING THE INTERVIEW TO NULL WHEN ONE IS REMOVED--------------
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
        
    return axios.delete(
      `/api/appointments/${id}`,
      appointment
    ).then(() => {
      setState(state => updateSpots({...state, appointments: {
        ...state.appointments,
        [id]: appointment
      }}))})
  };
    
  //-----------USEEFFECT THAT MAKES 3 AXIOS GET REQUESTS UPON STARTING THE APPLICATION TO RETRIEVE THE DATA TO LOAD--------
  useEffect(()=> {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      setState(prev => ({ 
        ...prev,
        days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      })
  }, []);

  return {state, setDay, bookInterview, cancelInterview};
};