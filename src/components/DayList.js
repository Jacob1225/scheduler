import React from "react";
import DayListItem from "components/DayListItem";

//--------COMPONENT THAT LOOPS THROUGH THE DAYLISTITEMS TO DISPLAYS ALL THE DAYS------------
export default function DayList(props) {
   return (
    <ul>
        {props.days.map(day => <DayListItem 
            key = {day.id}
            name={day.name}
            spots={day.spots}
            selected={day.name === props.day}
            setDay= {(event) => {props.setDay(day.name)}} />
        )}
    </ul>
   );
};