import { useState, useEffect } from "react";
import { Row, Col, Modal, Button, Container, ListGroup } from "react-bootstrap";

const InboxModal = (props) => {
  const [sentMails, setInboxMails] = useState([]);
  const userEmail = localStorage.getItem("userEmail"); // Get the user's email from local storage

  const handleInboxMail = async () => {
    const response = await fetch(
      "https://mailboxclient-afc29-default-rtdb.firebaseio.com/email.json",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (data) {
      const mailsArray = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .filter((mail) => mail.to === userEmail); // Filter mails by sender's email
      setInboxMails(mailsArray);
    }
  };

  useEffect(() => {
    if (props.show) {
      handleInboxMail();
    }
  }, [props.show]);

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sent Mails</Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <ListGroup>
            {sentMails.length === 0 ? (
              <ListGroup.Item>No sent mails found</ListGroup.Item>
            ) : (
              sentMails.map((mail) => (
                <ListGroup.Item key={mail.id}>
                  <Row>
                    <Col>
                      <strong>From:</strong> {mail.to}
                    </Col>
                    <Col xs={6}>
                      <strong>Mail:</strong> {mail.body}
                    </Col>
                    {/* <Col>
                      <strong>Timestamp:</strong> {mail.timestamp}
                    </Col> */}
                  </Row>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InboxModal;
