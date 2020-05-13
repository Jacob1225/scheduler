import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.value || null);

    const reset = () => {
        setName("");
        setInterviewer(null);
    }

    const cancel = () => {
        reset()
        props.onCancel()  
    }

    const save = () => {
        props.onSave(name, interviewer)
    }

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
                    />
                </form>
                <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button onClick={cancel} danger>Cancel</Button>
                    <Button onClick={save} confirm>Save</Button>
                </section>
            </section>
        </main>
    )
}