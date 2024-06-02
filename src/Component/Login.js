import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Assuming this is where you place your CSS

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userCredentials = {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUBjRU6Ogpua05IV9u1JV6JC74Qe55zRM",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userCredentials),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      console.log("Logged in");
      localStorage.setItem("token", data.idToken);
      navigate("/home");
    } catch (error) {
      alert(error.message);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Form onSubmit={handleLogin} className="form-container">
      <div className="form-wrapper">
        <h2 className="form-title">Sign In</h2>
        <Form.Group
          as={Row}
          className="form-group"
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
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="form-group"
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
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="form-group">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" className="submit-button">
              Sign in
            </Button>
          </Col>
        </Form.Group>
        <Link>Forgot password</Link>
      </div>
    </Form>
  );
}

export default Login;
