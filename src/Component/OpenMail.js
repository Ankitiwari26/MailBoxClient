import { Modal, Button } from "react-bootstrap";

const OpenMail = ({ mail, onClose, onReply }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mail from {mail.sender}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Subject:</strong> {mail.subject}
        </p>
        <div dangerouslySetInnerHTML={{ __html: mail.body }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onReply(mail.sender)}>
          Reply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OpenMail;
