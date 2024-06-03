import { useState, useEffect } from "react";
import { Row, Col, Container, ListGroup, Button } from "react-bootstrap";
import ReplyMail from "./ReplyMail";
import OpenMail from "./OpenMail";

const Inbox = () => {
  const [inboxMails, setInboxMails] = useState([]);
  const userEmail = localStorage.getItem("userEmail");
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyToEmail, setReplyToEmail] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedMail, setSelectedMail] = useState(null);

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
        .filter((mail) => mail.to === userEmail);
      setInboxMails(mailsArray);
      const unread = mailsArray.filter((mail) => !mail.read).length;
      setUnreadCount(unread);
    }
  };

  useEffect(() => {
    handleInboxMail();
  }, []);

  const handleReply = (email) => {
    setReplyToEmail(email);
    setShowReplyModal(true);
  };

  const handleReplyModalClose = () => {
    setShowReplyModal(false);
    setReplyToEmail("");
  };

  const handleMailClick = async (mail) => {
    const updatedMails = inboxMails.map((m) =>
      m.id === mail.id ? { ...m, read: true } : m
    );
    setInboxMails(updatedMails);

    try {
      await fetch(
        `https://mailboxclient-afc29-default-rtdb.firebaseio.com/email/${mail.id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ read: true }),
        }
      );
      console.log("Mail read status updated successfully");
    } catch (error) {
      console.error("Error updating mail read status:", error);
    }

    setSelectedMail(mail);
    const unread = updatedMails.filter((m) => !m.read).length;
    setUnreadCount(unread);
  };

  const handleMailClose = () => {
    setSelectedMail(null);
  };

  return (
    <Container>
      <h2>Inbox ({unreadCount} unread)</h2>
      {selectedMail ? (
        <OpenMail
          mail={selectedMail}
          onClose={handleMailClose}
          onReply={handleReply}
        />
      ) : (
        <ListGroup>
          {inboxMails.length === 0 ? (
            <ListGroup.Item>No messages found</ListGroup.Item>
          ) : (
            inboxMails.map((mail) => (
              <ListGroup.Item
                key={mail.id}
                onClick={() => handleMailClick(mail)}
                style={{ cursor: "pointer" }}
              >
                <Row>
                  <Col>
                    {mail.read ? null : (
                      <span style={{ color: "blue" }}>● </span>
                    )}
                    <strong>From:</strong> {mail.sender}
                  </Col>
                  <Col xs={6}>
                    <strong>Subject:</strong> {mail.subject}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      )}
      <ReplyMail
        show={showReplyModal}
        handleClose={handleReplyModalClose}
        to={replyToEmail}
      />
    </Container>
  );
};

export default Inbox;
