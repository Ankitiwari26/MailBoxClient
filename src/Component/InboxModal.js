// import { useState, useEffect } from "react";
// import { Row, Col, Modal, Button, Container, ListGroup } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import ReplyMail from "./ReplyMail";

// const InboxModal = (props) => {
//   const [sentMails, setInboxMails] = useState([]);
//   const userEmail = localStorage.getItem("userEmail");
//   const nevigate = useNavigate();
//   const [show, setShow] = useState(false);

//   const handleInboxMail = async () => {
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
//     }
//   };

//   useEffect(() => {
//     if (props.show) {
//       handleInboxMail();
//     }
//   }, [props.show]);

//     const handleReply = (email) => {
//       nevigate("/reply");
//     };

//   const handleClose = () => setShow(false);
//   const handleShow = () => {
//     setShow(true);

//   };

//   return (
//     <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">Sent Mails</Modal.Title>
//       </Modal.Header>
//       <Modal.Body className="grid-example">
//         <Container>
//           <ListGroup>
//             {sentMails.length === 0 ? (
//               <ListGroup.Item>No sent mails found</ListGroup.Item>
//             ) : (
//               sentMails.map((mail) => (
//                 <ListGroup.Item key={mail.id}>
//                   <Row>
//                     <Col>
//                       <strong>From:</strong> {mail.to}
//                     </Col>
//                     <Col xs={6}>
//                       <strong>Mail:</strong> {mail.body}
//                     </Col>
//                     <Col>
//                       {/* <strong>Timestamp:</strong> {mail.timestamp} */}
//                       <Button onClick={() => handleReply(mail.to)}>
//                         Reply
//                       </Button>
//                       <ReplyMail show={handleShow} close={handleClose}/>
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>
//               ))
//             )}
//           </ListGroup>
//         </Container>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default InboxModal;
import { useState, useEffect } from "react";
import { Row, Col, Modal, Button, Container, ListGroup } from "react-bootstrap";
import ReplyMail from "./ReplyMail";

const InboxModal = (props) => {
  const [sentMails, setSentMails] = useState([]);
  const userEmail = localStorage.getItem("userEmail");
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyToEmail, setReplyToEmail] = useState("");

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
      setSentMails(mailsArray);
    }
  };

  useEffect(() => {
    if (props.show) {
      handleInboxMail();
    }
  }, [props.show]);

  const handleReply = (email) => {
    setReplyToEmail(email);
    setShowReplyModal(true);
  };

  const handleReplyModalClose = () => {
    setShowReplyModal(false);
    setReplyToEmail("");
  };

  return (
    <>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sent Mails
          </Modal.Title>
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
                        <strong>From:</strong> {mail.sender}
                      </Col>
                      <Col xs={6}>
                        <strong>Mail:</strong> {mail.body}
                      </Col>
                      <Col>
                        <Button onClick={() => handleReply(mail.sender)}>
                          Reply
                        </Button>
                      </Col>
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
      <ReplyMail
        show={showReplyModal}
        handleClose={handleReplyModalClose}
        to={replyToEmail}
      />
    </>
  );
};

export default InboxModal;
