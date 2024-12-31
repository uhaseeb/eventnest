import React, { useState} from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../css/FormWrapper.css";
import "../css/Buttons.css";


export default function EventForm({ initialData = {}, onSubmit, buttonText }) {
  const [formData, setFormData] = useState({
    image: null,
    category: initialData.category || "",
    title: initialData.title || "",
    description: initialData.description || "",
    organizedBy: initialData.organizedBy || "",
    date: initialData.date || "",
    venue: initialData.venue || "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="event-form-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="event-form-container">
              <h2 className="text-center mb-4">
                {buttonText === "Update Event" ? "Update Event" : "Create Event"}
              </h2>
              <Form onSubmit={handleSubmit}>
                {/* Title */}
                <Form.Group controlId="formTitle" className="mb-4">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Description */}
                <Form.Group controlId="formDescription" className="mb-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Enter event description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Category */}
                <Form.Group controlId="formCategory" className="mb-4">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Art">Art</option>
                    <option value="Education">Education</option>
                  </Form.Control>
                </Form.Group>

                {/* Organized By */}
                <Form.Group controlId="formOrganizedBy" className="mb-4">
                  <Form.Label>Organized By</Form.Label>
                  <Form.Control
                    type="text"
                    name="organizedBy"
                    placeholder="Enter organizer name"
                    value={formData.organizedBy}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Date */}
                <Form.Group controlId="formDate" className="mb-4">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Venue */}
                <Form.Group controlId="formVenue" className="mb-4">
                  <Form.Label>Venue</Form.Label>
                  <Form.Control
                    type="text"
                    name="venue"
                    placeholder="Enter venue details"
                    value={formData.venue}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Upload Image */}
                <Form.Group controlId="formImage" className="mb-4">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  {initialData.imageUrl && (
                    <small className="text-muted">
                      Current Image: {initialData.imageUrl}
                    </small>
                  )}
                </Form.Group>

                {/* Submit Button */}
                <div className="d-flex flex-column">
                  <Button
                    variant="primary"
                    type="submit"
                    className="mb-3 login-btn"
                  >
                    {buttonText || "Submit"}
                  </Button>
                  {buttonText === "Update Event" && (
                    <Button variant="danger" type="button" className="login-btn">
                      Delete Event
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
