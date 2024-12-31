import React, {useContext} from "react";
import EventForm from "../components/EventForm";
import { useParams } from "react-router-dom";
import { alertContext } from "../context/context";
import {useNavigate} from 'react-router-dom';
import events from "../events";


export default function UpdateEventPage() {
  const navigator = useNavigate('')
  const alertCtx = useContext(alertContext);
  const {id} = useParams();
  const event = events.find((p) => p.id === Number(id));

  // Mock existing event data
  const mockEventData = {
    imageUrl: event.image,
    category: event.category,
    title: event.title,
    description: event.description,
    organizedBy: event.organizer,
    date: event.date,
    venue: event.venue,
  };

  const handleUpdate = (updatedData) => {
    alertCtx.showAlert('Event updated successfully', 'success');
    navigator('/events');

    // Make an API call to update the existing event
  };

  return (
    <div>
      <EventForm
        initialData={mockEventData}
        onSubmit={handleUpdate}
        buttonText="Update Event"
      />
    </div>
  );
}
