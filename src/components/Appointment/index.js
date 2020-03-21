import React  from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    const saving = props.bookInterview(props.id, interview);
    if (saving === undefined) {
      setTimeout(() => {
        transition(SHOW);
      }, 1000)
    }
  
}
function onDelete() {
  transition(DELETING, true);
const deleting = props.cancelInterview(props.id)
if (!deleting){
  setTimeout(() =>{
    transition(EMPTY)
  },1000)
}  
}


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && ( <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => transition(CONFIRM)}
      onEdit={() => transition(CREATE)}
  />
)}
      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={back} onSave={save}/>)}
      {mode === SAVING && (<Status message="Saving"/>)}
      {mode === DELETING && (
        <Status
          message={'Deleting'}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={'Delete the appointment?'}
          onConfirm= { onDelete }
          onCancel={ back }
        />
      )}
      {mode === ERROR_DELETE && <Error 
        message='Could not delete.'
        onClose={back}
      />}
      {mode === ERROR_SAVE && <Error
        message='Could not save.'
        onClose={ back}
      />}
    </article>
  );
}