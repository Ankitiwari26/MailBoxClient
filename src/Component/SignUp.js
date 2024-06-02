import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nevigate = useNavigate();

  const userDetails = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!email || !password || !confirmPassword) {
      alert("Email, Password, or Confirm Password cannot be empty");
      return;
    }

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUBjRU6Ogpua05IV9u1JV6JC74Qe55zRM",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }
      );
      const data = await response.json();
      console.log(data, "Sign up Successfully");

      if (!response.ok) {
        throw new Error(data.error.message);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const handleRedirectRoLogin = () => {
    nevigate("/login");
  };

  return (
    <Form onSubmit={handleSubmit} className="sign-up-form">
      <h2>Sign Up</h2>
      <Form.Group
        as={Row}
        className="mb-3 form-group"
        controlId="formHorizontalEmail"
      >
        <Form.Label column sm={2} className="form-label">
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
            className="form-control"
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3 form-group"
        controlId="formHorizontalPassword"
      >
        <Form.Label column sm={2} className="form-label">
          Password
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            className="form-control"
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3 form-group"
        controlId="formHorizontalConfirmPassword"
      >
        <Form.Label column sm={2} className="form-label">
          Confirm Password
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            className="form-control"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" className="submit-button">
            SignUp
          </Button>
        </Col>
      </Form.Group>
      {/* <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" className="submit-button">
              Login
            </Button>
          </Col>
        </Form.Group> */}

      <Button onClick={handleRedirectRoLogin}>Login</Button>
    </Form>
  );
}

export default SignUp;
