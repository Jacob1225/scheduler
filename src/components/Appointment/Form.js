import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

//--------COMPONENT THAT DISPLAYS THE FORM TO CREATE AN INTERVIEW--------------
export default function Form(props) {
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState("");
    
    //---------RESETS THE FORM INPUT TO A BLANK NAME AND NO INTERVIEWER SELECTED----------
    const reset = () => {
        setName("");
        setInterviewer(null);
    };

    //--------RESETS FROM INPUT WHEN USER CLICKS THE CANCEL BUTTON--------------
    const cancel = () => {
        reset()
        props.onCancel()  
    };

    //----------VALIDATES THAT THE USER HAS ENTERED A NAME IN THE FORM INPUT FIELD------------
    function validate() {
        if (name === "") {
          setError("Student name cannot be blank");
          return;
        }
        setError("");
        props.onSave(name, interviewer);
    };

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={event => event.preventDefault()}>
                    <input
                        className="appointment__create-input text--semi-bold"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter Student Name"
                        data-testid="student-name-input"
                    />
                </form>
                <section className="appointment__validation">{error}</section>
                <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button onClick={cancel} danger>Cancel</Button>
                    <Button onClick={() => validate()} confirm>Save</Button>
                </section>
            </section>
        </main>
    )
};