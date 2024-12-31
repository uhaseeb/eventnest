import React, {useContext} from "react";
import EventForm from "../components/EventForm";
import { alertContext } from "../context/context";
import {useNavigate} from 'react-router-dom';

export default function CreateEventPage() {
  const navigator = useNavigate('')
  const alertCtx = useContext(alertContext);

  const handleCreate = (formData) => {      
      alertCtx.showAlert('Event created successfully', 'success');
      navigator('/events');

    // Make an API call to create a new event
  };

  return (
    <div>
      <EventForm onSubmit={handleCreate} buttonText="Create Event" />
    </div>
  );
}
