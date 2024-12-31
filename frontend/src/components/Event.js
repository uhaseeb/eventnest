import { useContext } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import {userContext} from '../context/context.js'

export default function Event(props) {
  const navigate = useNavigate('')
  const auth = useContext(userContext)

  const checkUserAuth = () => {
    if (!auth.user.username) {
      navigate('/login')
    }
  }

  return (
    <div>
      <Card style={{ width: "20rem" }}>
      <Link className="nav-link" to={`/event/${props.event.id}`}>
        <Card.Img variant="top" src={props.event.image? props.event.image:"https://via.placeholder.com/150"} alt="Event img" style={{height: '15rem'}}/>
        </Link>
        <Card.Body>
          <Card.Title>{props.event.title}</Card.Title>
          <Card.Text>
            <strong>Organizer:</strong> {props.event.organizer}
          </Card.Text>
          <Card.Text>
            <strong>Date:</strong> {props.event.date}
          </Card.Text>
          <Card.Text>
            <strong>Time:</strong> {props.event.time}
          </Card.Text>
          <Card.Text>
            <strong>Duration:</strong> {props.event.duration}
          </Card.Text>
          <Card.Text>
            <strong>Venue:</strong> {props.event.venue}
          </Card.Text>
          <Card.Text>
            {props.event.description}
          </Card.Text>
          <div>
          <Button variant="primary" onClick={checkUserAuth}>
            Register
          </Button>
          {auth.user.type === 'Organizer' && <Link to={`/event/update/${props.event.id}`}><Button variant="primary">Update Event</Button></Link>}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
