import React, { Fragment } from 'react'
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );

    const handleOnAdd = () => {
        transition(CREATE);
    }

    const handleCancel = () => {
        back();
    }

    return (
        <article className="appointment">
            <Header 
            time= {props.time}/>
            {mode === EMPTY && (<Empty  onAdd={handleOnAdd} />)}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    name={props.interview.interviewer.name}
                />
            )}
            {mode === CREATE && (<Form
                name={props.name}
                value={props.value}
                interviewers={[]}
                onSave={props.onSave}
                onCancel={handleCancel} /> )}
            
        </article>
    )
};