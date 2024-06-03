// import { useState, useEffect } from "react";
// import { Row, Col, Container, ListGroup, Button } from "react-bootstrap";
// import ReplyMail from "./ReplyMail";
// import OpenMail from "./OpenMail"; // Import the OpenMail component

// const Inbox = () => {
//   const [inboxMails, setInboxMails] = useState([]);
//   const [showReplyModal, setShowReplyModal] = useState(false);
//   const [replyToEmail, setReplyToEmail] = useState("");
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showOpenMail, setShowOpenMail] = useState(false);
//   const [openMailContent, setOpenMailContent] = useState(null);
//   const userEmail = localStorage.getItem("userEmail");

//   const fetchMails = async () => {
//     const response = await fetch(
//       "https://mailboxclient-afc29-default-rtdb.firebaseio.com/email.json",
//       {
//         method: "GET",
//       }
//     );
//     const data = await response.json();
//     if (data) {
//       const mailsArray = Object.keys(data)
//         .map((key) => ({ id: key, ...data[key] }))
//         .filter((mail) => mail.to === userEmail);
//       setInboxMails(mailsArray);
//       const unread = mailsArray.filter((mail) => !mail.read).length;
//       setUnreadCount(unread);
//     }
//   };

//   useEffect(() => {
//     fetchMails();
//     const intervalId = setInterval(() => {
//       fetchMails();
//     }, 2000); // Polling interval of 2 seconds

//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, []);

//   const handleReply = (email) => {
//     setReplyToEmail(email);
//     setShowReplyModal(true);
//   };

//   const handleReplyModalClose = () => {
//     setShowReplyModal(false);
//     setReplyToEmail("");
//   };

//   const handleMailClick = async (mail) => {
//     setOpenMailContent(mail);
//     setShowOpenMail(true);

//     if (!mail.read) {
//       const updatedMails = inboxMails.map((m) =>
//         m.id === mail.id ? { ...m, read: true } : m
//       );
//       setInboxMails(updatedMails);

//       try {
//         await fetch(
//           `https://mailboxclient-afc29-default-rtdb.firebaseio.com/email/${mail.id}.json`,
//           {
//             method: "PATCH",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ read: true }),
//           }
//         );
//         console.log("Mail read status updated successfully");
//       } catch (error) {
//         console.error("Error updating mail read status:", error);
//       }

//       const unread = updatedMails.filter((mail) => !mail.read).length;
//       setUnreadCount(unread);
//     }
//   };

//   const handleDeleteMail = async (mailId) => {
//     try {
//       await fetch(
//         `https://mailboxclient-afc29-default-rtdb.firebaseio.com/email/${mailId}.json`,
//         {
//           method: "DELETE",
//         }
//       );
//       const updatedMails = inboxMails.filter((mail) => mail.id !== mailId);
//       setInboxMails(updatedMails);
//       const unread = updatedMails.filter((mail) => !mail.read).length;
//       setUnreadCount(unread);
//       console.log("Mail deleted successfully");
//     } catch (error) {
//       console.error("Error deleting mail:", error);
//     }
//   };

//   const handleOpenMailClose = () => {
//     setShowOpenMail(false);
//     setOpenMailContent(null);
//   };

//   return (
//     <Container>
//       <h2>Inbox ({unreadCount} unread)</h2>
//       <ListGroup>
//         {inboxMails.length === 0 ? (
//           <ListGroup.Item>No messages found</ListGroup.Item>
//         ) : (
//           inboxMails.map((mail) => (
//             <ListGroup.Item key={mail.id} style={{ cursor: "pointer" }}>
//               <Row>
//                 <Col onClick={() => handleMailClick(mail)}>
//                   {mail.read ? null : <span style={{ color: "blue" }}>● </span>}
//                   <strong>From:</strong> {mail.sender}
//                 </Col>
//                 <Col xs={6} onClick={() => handleMailClick(mail)}>
//                   <strong>Subject:</strong> {mail.subject}
//                 </Col>
//                 <Col>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDeleteMail(mail.id);
//                     }}
//                   >
//                     Delete
//                   </Button>
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     className="ml-2"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleReply(mail.sender);
//                     }}
//                   >
//                     Reply
//                   </Button>
//                 </Col>
//               </Row>
//             </ListGroup.Item>
//           ))
//         )}
//       </ListGroup>
//       <ReplyMail
//         show={showReplyModal}
//         handleClose={handleReplyModalClose}
//         to={replyToEmail}
//       />
//       {showOpenMail && (
//         <OpenMail
//           show={showOpenMail}
//           handleClose={handleOpenMailClose}
//           mail={openMailContent}
//           handleReply={handleReply}
//         />
//       )}
//     </Container>
//   );
// };

// export default Inbox;

import { useEffect, useState } from "react";
import { Container, ListGroup, Row, Col, Button } from "react-bootstrap";
import ReplyMail from "./ReplyMail";
import OpenMail from "./OpenMail";
import useMailboxAPI from "./useMailboxAPI ";

const Inbox = () => {
  const { inboxMails, unreadCount, markMailAsRead, deleteMail } =
    useMailboxAPI();
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
