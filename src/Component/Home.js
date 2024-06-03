import Button from "react-bootstrap/Button";
import ComposeMailModal from "./ComposeModal";
import { useState } from "react";
import SentModal from "./SentModal";
import InboxModal from "./InboxModal";

const Home = () => {
  const [showSentModal, setShowSentModal] = useState(false);
  const [showInboxModal, setShowInboxModal] = useState(false);

  return (
    <>
      <h1>Welcome to MailBoxClient</h1>
      <ComposeMailModal />
      <Button variant="primary" onClick={() => setShowSentModal(true)}>
        Sent
      </Button>
      <SentModal show={showSentModal} onHide={() => setShowSentModal(false)} />
      <Button variant="primary" onClick={() => setShowInboxModal(true)}>
        Inbox
      </Button>
      <InboxModal
        show={showInboxModal}
        onHide={() => setShowInboxModal(false)}
      />
    </>
  );
};
export default Home;
