import React from "react";

//-------COMPONENT THAT DEPLAYS THE ADD BUTTON WHEN NO APPOINTMENT IS SET---------
export default function Empty(props) {
    return (
        <main className="appointment__add">
            <img
                className="appointment__add-button"
                src="images/add.png"
                alt="Add"
                onClick={props.onAdd}
            />
        </main>
    )
};