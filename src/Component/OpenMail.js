import React from "react";
import { Modal, Button } from "react-bootstrap";

const OpenMail = ({ show, handleClose, mail, handleReply }) => {
  if (!mail) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{mail.subject}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>From: {mail.sender}</p>
        <p>To: {mail.to}</p>
        <div dangerouslySetInnerHTML={{ __html: mail.body }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleReply(mail.sender)}>
          Reply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OpenMail;
