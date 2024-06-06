import { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import JoditEditor from "jodit-react";

function ReplyMail({ show, handleClose, to, handleSendMail }) {
  const [toEmail, setToEmail] = useState(to);
  const [body, setBody] = useState("");
  const editor = useRef(null);

  useEffect(() => {
    setToEmail(to);
  }, [to]);

  const handleBody = (newContent) => {
    setBody(newContent);
  };

  const handleSentMail = (e) => {
    e.preventDefault();
    handleSendMail(toEmail, body);
    setBody("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reply Mail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSentMail}>
          <Form.Group className="mb-3" controlId="replyForm.ControlInput1">
            <Form.Label>To</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="replyForm.ControlTextarea1">
            <Form.Label>Write Text</Form.Label>
            <JoditEditor ref={editor} value={body} onChange={handleBody} />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Send Mail
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ReplyMail;
