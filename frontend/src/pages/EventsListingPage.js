import Event from "../components/Event";
import React, {useContext} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import events from '../events';
import '../css/Buttons.css';
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/context";

export default function EventsListingPage() {
  const auth = useContext(userContext);
  const navigator = useNavigate('')

  const navigateButton = () => {
    navigator('/event/create')
  }

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Events</h2>
      <Container className="my-3">
      <div className="btn-container text-end">
      {auth.user.type === 'Organizer' && <Button className="btn btn-primary create-event-btn" onClick={navigateButton}>Create New Event</Button>}
      </div>
        <Row>
          {events.map((event, index) => (
            <Col md={3} key={index} className="mb-4 mt-4">
              <Event event={event}/>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
