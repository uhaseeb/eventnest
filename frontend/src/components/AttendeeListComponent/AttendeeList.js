import React, { useState } from 'react';
import { ListGroup, Card, Button, Accordion } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import './AttendeeList.css';


export default function AttendeeList(props) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCollapse = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div>
      <Card className="attendee-list-card">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Attendees</h5>
        <Button
          variant="link"
          className="text-decoration-none"
          onClick={toggleCollapse}
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </Button>
      </Card.Header>
      <Accordion activeKey={isOpen ? "0" : null}>
        <Accordion.Collapse eventKey="0">
          <ListGroup variant="flush">
            {props.attendees.map((attendee, index) => (
              <ListGroup.Item key={index}>
                {attendee.name} ({attendee.email})
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Accordion.Collapse>
      </Accordion>
    </Card>
    </div>
  )
}
