import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { v4 as uuidv4 } from "uuid";
import JoditEditor from "jodit-react";

function ComposeMailModal() {
  const [show, setShow] = useState(false);
  const [to, setTo] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");

  const editor = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTo = (e) => {
    setTo(e.target.value);
  };

  const handleSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleBody = (newContent) => {
    setBody(newContent);
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = {
      to,
      body,
      subject,
      sender: localStorage.getItem("userEmail"),
      // id: uuidv4(),
      read: false,
    };
    try {
      await fetch(
        "https://mailboxclient-afc29-default-rtdb.firebaseio.com/email.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        }
      );
      console.log("Mail sent successfully");
      handleClose();
    } catch (error) {
      console.error("Error sending mail:", error);
    } finally {
      setLoading(false);
      setBody("");
      setTo("");
      setSubject("");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Compose +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Compose Mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSendMail}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                value={to}
                onChange={handleTo}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={handleSubject}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Write Text</Form.Label>
              <JoditEditor ref={editor} value={body} onChange={handleBody} />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              Send Mail
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ComposeMailModal;
