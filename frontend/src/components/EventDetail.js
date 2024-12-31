import React, {useContext} from 'react'
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { userContext } from '../context/context';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import events from '../events';
import AttendeeList from './AttendeeListComponent/AttendeeList';

export default function EventDetail() {
  const attendees = [
    {name: 'Haseeb', email: 'uhaseeb7314@gmail.com'},
    {name: 'Ali', email: 'ali7314@gmail.com'},
    {name: 'Hamza', email: 'hamza314@gmail.com'},
    {name: 'Ahmad', email: 'ahmad@gmail.com'},
    {name: 'Ahsan', email: 'ahsan@gmail.com'},
  ]
  const auth = useContext(userContext)
  const navigator = useNavigate('')
  const {id} = useParams();
  const event = events.find((p) => p.id === Number(id));
  
  const checkUserAuth = () => {
    if (!auth.user.username) {
      navigator('/login')
    }
  }

  return (
    <div>
      <Image
        src={event.image? event.image:"https://images.unsplash.com/photo-1562577309-2592ab84b1bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTMzOTl8MHwxfGFsbHwxfHx8fHx8fHwxNjk0NDA1NzE5&ixlib=rb-4.0.3&q=80&w=1080"}
        alt="Event Image"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
        }}
      />

      {/* Event Details */}
      <Container className="my-5" style={{marginLeft: "5px"}}>
        <h2 className="mb-4">{event.title}</h2>
        <Row>
          <Col md={12}>
            <p>
              <strong>Description:</strong> {event.description}
            </p>
            <p>
              <strong>Date:</strong> {event.date}
            </p>
            <p>
              <strong>Category:</strong> {event.category}
            </p>
            <p>
              <strong>Venue:</strong> {event.venue}
            </p>
            <p>
              <strong>Organizer:</strong> {event.organizer}
            </p>
            <p>
              <strong>Time:</strong> {event.time}
            </p>
            <p>
              <strong>Duration:</strong> {event.duration}
            </p>
            <p>
              <strong>Hash Tags:</strong> {event.hashtags.join(", ")}
            </p>

            {auth.user.type==='Organizer' && <AttendeeList attendees={attendees}/>}
            <div className="mt-4">
              <Button variant="primary" onClick={checkUserAuth}>
                Register Now
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
