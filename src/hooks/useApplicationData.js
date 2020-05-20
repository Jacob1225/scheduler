import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function useApplicationData() {
    const [state, setState] = useState(
        {
          day: "Monday",
          days: [],
          appointments: {},
          interviewers: {}
        });

        console.log(state.days)

    const setDay = day => setState({ ...state, day });

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
            `http://localhost:8001/api/appointments/${id}`, 
            appointment
        ).then(() => {
            setState({
                ...state,
                appointments,
                days
            })
        })
      }

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
            `http://localhost:8001/api/appointments/${id}`,
            appointment
        ).then(() => {
            setState({
                ...state,
                appointments,
                days

            })
        })
    }
    
    useEffect(()=> {
      Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers')
      ])
        .then((all) => {
          setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
        })
    }, []);

    return {state, setDay, bookInterview, cancelInterview};
}