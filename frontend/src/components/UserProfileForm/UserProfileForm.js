import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import './UserProfile.css'
import "../../css/FormWrapper.css";
import "../../css/Buttons.css";
import { alertContext } from "../../context/context";


export default function ProfileUpdateForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    username: initialData.username || "",
    email: initialData.email || "",
    profilePicture: null,
    gender: initialData.gender || "",
    age: initialData.age || "",
    phone: initialData.phone || "",
    address: initialData.address || "",
    city: initialData.city || "",
    country: initialData.country || "",
    eventPreferences: initialData.eventPreferences || ["Business", "Technology"],
    hashtags: initialData.hashtags || ["#React"],
  });
  const alertCtx = useContext(alertContext)
  const [activeTab, setActiveTab] = useState("personal");

  const categories = [
    "Technology",
    "Business",
    "Art",
    "Education",
    "Health & Wellness",
    "Entertainment",
    "Action",
  ];

  const hashtags = [
    "#Networking",
    "#CareerGrowth",
    "#PersonalDevelopment",
    "#AI",
    "#Entrepreneurship",
    "#WebDevelopment",
    "#React",
  ];
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMultiSelectChange = (e, key) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, [key]: options });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
      alertCtx.showAlert('Profile updated successfully', 'success')
    }
  };

  return (
    <div className="event-form-wrapper">
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="md-6 profile-form position-absolute top-50 start-50 translate-middle">
          <h2 className="text-center my-4">Update Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-4"
              justify
            >
              {/* Personal Information Tab */}
              <Tab eventKey="personal" title="Personal Information">
              <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formAge" className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formGender" className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formProfilePicture" className="mb-3">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  {initialData.profilePictureUrl && (
                    <small className="text-muted">
                      Current Profile Picture: {initialData.profilePictureUrl}
                    </small>
                  )}
                </Form.Group>
              </Tab>

              {/* Contact Information Tab */}
              <Tab eventKey="contact" title="Contact Information">
                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formAddress" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formCity" className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formCountry" className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    placeholder="Enter country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Tab>

              {/* Preferences Tab */}
              <Tab eventKey="preferences" title="Event Preferences">
                <Form.Group controlId="formEventPreferences" className="mb-3">
                  <Form.Label>Select Event Categories</Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    value={formData.eventPreferences}
                    onChange={(e) =>
                      handleMultiSelectChange(e, "eventPreferences")
                    }
                  >
                    {categories.map((category, key) => (
                      <option key={key} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formHashtags" className="mb-3">
                  <Form.Label>Select Event Hashtags</Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    value={formData.hashtags}
                    onChange={(e) => handleMultiSelectChange(e, "hashtags")}
                  >
                    {hashtags.map((hashtag, key) => (
                      <option key={key} value={hashtag}>
                        {hashtag}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Tab>
            </Tabs>

            {/* Submit Button */}
            <Button variant="primary" type="submit" className="login-btn">
              Update Profile
            </Button>
          </Form>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}
