import React, { Fragment } from 'react'
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm";
import "components/Appointment/styles.scss"
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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

      function confirmation () {
          transition(CONFIRM);
      }

      function remove () {
        transition(DELETING)
        props.cancelInterview(props.id).then(() => transition(EMPTY))
      }

      function edit () {  
        transition(EDIT)

      }

    return (
        <article className="appointment">
            <Header 
            time= {props.time}/>
            {mode === EMPTY && (<Empty  onAdd={handleOnAdd} />)}
            {mode === SAVING && (<Status message={"Saving"} />)}
            {mode === DELETING && (<Status message={"Deleting"} />)}
            {mode === CONFIRM && (
                <Confirm 
                    message={"Are you sure you want to delete?"}
                    onCancel={handleCancel}
                    onConfirm={remove}
                /> 
            )}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onEdit={edit}
                    onDelete={confirmation}

                />
            )}
            {mode === CREATE && (
                <Form
                    name={props.name}
                    interviewer={props.interview}
                    interviewers={props.interviewers}
                    onSave={save}
                    onCancel={handleCancel} 
                /> 
            )}
            {mode === EDIT && (
                <Form
                    name={props.interview.student}
                    interviewer={props.interview.interviewer.id}
                    interviewers={props.interviewers}
                    onSave={save}
                    onCancel={handleCancel}
                />   
            )}

            
        </article>
    )
};