import React from 'react';
import "components/DayListItem.scss";
import { render } from '@testing-library/react';

const classnames = require('classnames');

//-------COMPONENT THAT DISPLAYS THE INFORMATION FOR THAT DAY IN THE SIDEBAR-------------
export default function DayListItem(props) {
    const dayClass = classnames(
        "day-list__item", 
        {"day-list__item--selected": props.selected,
        "day-list__item--full": !props.spots

    });

    //------FUNCTION THAT FORMATS THE SPOTS REMAINING FOR THAT DAY IN THE SIDEBAR---------
    function formatSpots(spots) {
        if (spots === 0) {
            return (`no spots remaining`);
        
        } else if (spots === 1) {
            return (`${spots} spot remaining`);
        
        } else {
            return (`${spots} spots remaining`);
        }
    };

    return (
        <li 
            data-testid="day" 
            className={dayClass}
            onClick={props.setDay}>
            <h2 className="text--regular">{props.name}</h2>
            <h3 className="text--light">{formatSpots(props.spots)}</h3>
        </li>
        
    );
};
