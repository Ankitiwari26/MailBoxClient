import { useEffect, useState } from "react";
import { Container, ListGroup, Row, Col, Button } from "react-bootstrap";
import ReplyMail from "./ReplyMail";
import OpenMail from "./OpenMail";
import useMailboxAPI from "./useMailboxAPI ";

const Inbox = () => {
  const {
    inboxMails,
    unreadCount,
    markMailAsRead,
    deleteMail,
    handleSendMail,
  } = useMailboxAPI();
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyToEmail, setReplyToEmail] = useState("");
  const [showOpenMail, setShowOpenMail] = useState(false);
  const [openMailContent, setOpenMailContent] = useState(null);

  const handleReply = (email) => {
    setReplyToEmail(email);
    setShowReplyModal(true);
  };

  const handleMailClick = async (mail) => {
    setOpenMailContent(mail);
    setShowOpenMail(true);

    if (!mail.read) {
      markMailAsRead(mail.id);
    }
  };

  const handleDeleteMail = async (mailId) => {
    deleteMail(mailId);
  };

  const handleOpenMailClose = () => {
    setShowOpenMail(false);
    setOpenMailContent(null);
  };

  return (
    <Container>
      <h2>Inbox ({unreadCount} unread)</h2>
      <ListGroup>
        {inboxMails.length === 0 ? (
          <ListGroup.Item>No messages found</ListGroup.Item>
        ) : (
          inboxMails.map((mail) => (
            <ListGroup.Item key={mail.id} style={{ cursor: "pointer" }}>
              <Row>
                <Col onClick={() => handleMailClick(mail)}>
                  {mail.read ? null : <span style={{ color: "blue" }}>● </span>}
                  <strong>From:</strong> {mail.sender}
                </Col>
                <Col xs={6} onClick={() => handleMailClick(mail)}>
                  <strong>Subject:</strong> {mail.subject}
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMail(mail.id);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="ml-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReply(mail.sender);
                    }}
                  >
                    Reply
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
      <ReplyMail
        show={showReplyModal}
        handleClose={() => setShowReplyModal(false)}
        to={replyToEmail}
        handleSendMail={handleSendMail}
      />
      {showOpenMail && (
        <OpenMail
          show={showOpenMail}
          handleClose={handleOpenMailClose}
          mail={openMailContent}
          handleReply={handleReply}
        />
      )}
    </Container>
  );
};

export default Inbox;
