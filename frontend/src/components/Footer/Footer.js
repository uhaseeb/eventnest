import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={12} className="d-flex justify-content-between align-items-center">
            <p><strong>EventNest </strong>Your go-to platform for event management and registration.</p>
            <p className="mb-0">
              &copy; 2024 EventNest. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
