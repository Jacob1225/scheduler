import React, {useState} from 'react';

//----------CUSTOM HOOK THAT SETS THE MODE AND HISTORY TO ALLOW TRANSITIONING BETWEEN MODES IN THE APP-----------
export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    
    //-----------FUNCTION THE TRANSITION TO THE MODE THAT IS PASSED TO IT AS AN ARGUMENT---------------
    const transition = (newMode, replace = false) =>  {
        if (replace) {
            setHistory(currentHistory => [...currentHistory.splice(0, history.length -1), newMode])
            setMode(newMode)
            
        } else {
            setHistory(history => [...history, newMode])
            setMode(newMode)
        }
    }

    //--------FUNCTION THAT TRANSITIONS TO THE PREVIOUS MODE--------------
    const back = () => {
        
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
  
