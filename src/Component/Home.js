import Button from "react-bootstrap/Button";
import ComposeMailModal from "./ComposeModal";
import { useState } from "react";
import SentModal from "./SentModal";
import InboxModal from "./InboxModal";

const Home = () => {
  const [showSentModal, setShowSentModal] = useState(false);

  return (
    <>
      <h1>Welcome to MailBoxClient</h1>
      <ComposeMailModal />
      <Button variant="primary" onClick={() => setShowSentModal(true)}>
        Sent
      </Button>
      <SentModal show={showSentModal} onHide={() => setShowSentModal(false)} />
      <InboxModal />
    </>
  );
};
export default Home;
