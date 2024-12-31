import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "../css/FormWrapper.css";
import "../css/Buttons.css"
import { alertContext } from "../context/context";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigator = useNavigate('')

  const alertCtx = useContext(alertContext)

  const signupUser = () => {
    alertCtx.showAlert('User signup successful', 'success');
    navigator('/login');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    signupUser();
    // Call the register API here
    console.log("Registering with:", { email, password });
  };

  return (
    <div className="event-form-wrapper">
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={5} className="py-2 px-5 position-absolute top-50 start-50 translate-middle">
        <div className="event-form-container">
          <h3 className="text-center my-3">Register</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="login-btn">
              Register
            </Button>
          </Form>
          
          <div className="text-center mt-3 my-3">
            <a href="/login">Already have an account? Login here</a>
          </div>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Register;
