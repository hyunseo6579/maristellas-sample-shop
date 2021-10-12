import React from "react";
import { Nav, ProgressBar, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps({ step1, step2, step3 }) {
  return (
    <div className="mb-4">
      <Row className="d-flex justify-content-start">
        <Col>
          {" "}
          {step1 ? (
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Login</Nav.Link>
          )}{" "}
        </Col>

        <Col>
          {" "}
          {step2 ? (
            <LinkContainer to="/shipping">
              <Nav.Link>Shipping</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )}{" "}
        </Col>

        <Col>
          {" "}
          {step3 ? (
            <LinkContainer to="/placeorder">
              <Nav.Link>Place Order</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Place Order</Nav.Link>
          )}{" "}
        </Col>
      </Row>
      <ProgressBar striped variant="info" now={step3 ? 66 : step2 ? 33 : 0} />
    </div>
  );
}

export default CheckoutSteps;
