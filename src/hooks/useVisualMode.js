import React, {useState} from 'react';

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    
    const transition = (newMode, replace = false) =>  {
        if (replace) {
            setHistory(currentHistory => [...currentHistory.splice(0, history.length -1), newMode])
            setMode(newMode)
            
        } else {
            setHistory(history => [...history, newMode])
            setMode(newMode)
        }
    }

    const back = () => {
        console.log(history)
        let newHistory = [...history];
        if (newHistory.length > 1 ) {
            let filtered = newHistory.filter(word => word !== mode)
            setHistory(filtered);
            setMode(filtered[filtered.length - 1])
        } else {
            setMode(mode);
        }
    }

    return { mode, transition, back};
    }
  
