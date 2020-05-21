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
    
    //------------FUNCTION THAT INCREMENTS THE SPOTS REMAINING FOR THE DAY BY 1 WHEN AN INTERVIEW IS REMOVED
    function incrementSpots (id) {
        for (let dayObj of state.days) {
            if (dayObj.appointments.includes(id)) {
                 const daySpots = {
                    ...dayObj,
                    spots: dayObj.spots += 1
                };
                let daysArray = [...state.days];
                daysArray[dayObj.id - 1] = daySpots;
                return daysArray;
            }
        }
    };

    //----------FUNCTION THAT DECREMENTS THE SPOTS REMAINING FOR THE DAY BY 1 WHEN AN INTERVIEW IS ADDED 
    function decrementSpots (id) {
        for (let dayObj of state.days) {
            if (dayObj.appointments.includes(id)) {
                 const daySpots = {
                    ...dayObj,
                    spots: dayObj.spots += - 1
                };
                let daysArray = [...state.days];
                daysArray[dayObj.id - 1] = daySpots;
                return daysArray;
            }
        }
    };

    //--------FUNCTION THAT UPDATES THE CURRENT STATE WITH THE INTERVIEW INFORMATION WHEN ONE IS ADDED-------------
    function bookInterview(id, interview) {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        }
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }
        const days = decrementSpots(id)

        return axios.put(
            `/api/appointments/${id}`, 
            appointment
        ).then(() => {
            setState({
                ...state,
                appointments,
                days
            })
        })
      }

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

        const days = incrementSpots(id)
        
    
        return axios.delete(
            `/api/appointments/${id}`,
            appointment
        ).then(() => {
            setState({
                ...state,
                appointments,
                days

            })
        })
    }
    
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
}