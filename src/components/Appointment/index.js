import React, { Fragment } from 'react'
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status"
import "components/Appointment/styles.scss"
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

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

    function save(name, interviewer) {
        const interview = {
          student: name,
          interviewer
        };
        transition(SAVING)
        props.bookInterview(props.id, interview).then(() => transition(SHOW))
      }

    return (
        <article className="appointment">
            <Header 
            time= {props.time}/>
            {mode === EMPTY && (<Empty  onAdd={handleOnAdd} />)}
            {mode === SAVING && (<Status message={"Saving"} />)}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                />
            )}
            {mode === CREATE && (<Form
                name={props.name}
                interviewer={props.interviewer}
                interviewers={props.interviewers}
                onSave={save}
                onCancel={handleCancel} /> )}
            
        </article>
    )
};