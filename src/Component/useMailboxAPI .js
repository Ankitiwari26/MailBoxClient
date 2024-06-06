import { useState, useEffect } from "react";

const useMailboxAPI = () => {
  const [inboxMails, setInboxMails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const userEmail = localStorage.getItem("userEmail");

  const fetchInboxMails = async () => {
    try {
      const response = await fetch(
        "https://mailboxclient-afc29-default-rtdb.firebaseio.com/email.json",
        { method: "GET" }
      );
      const data = await response.json();
      console.log("Fetched Data:", data);
      if (data) {
        const mailsArray = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] }))
          .filter((mail) => mail.to === userEmail);
        setInboxMails(mailsArray);
        const unread = mailsArray.filter((mail) => !mail.read).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("Error fetching inbox mails:", error);
    }
  };

  // useEffect(() => {
  //   fetchInboxMails();
  // }, []);

  useEffect(() => {
    fetchInboxMails();
    const interval = setInterval(fetchInboxMails, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMail = async (toEmail, body) => {
    const email = {
      to: toEmail,
      body,
      sender: userEmail,
      read: false,
    };
    try {
      const response = await fetch(
        "https://mailboxclient-afc29-default-rtdb.firebaseio.com/email.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(email),
        }
      );
      const data = await response.json();
      console.log("Mail sent successfully", data);
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  };

  const markMailAsRead = async (mailId) => {
    try {
      await fetch(
        `https://mailboxclient-afc29-default-rtdb.firebaseio.com/email/${mailId}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ read: true }),
        }
      );
      console.log("Mail read status updated successfully");

      const updatedMails = inboxMails.map((mail) =>
        mail.id === mailId ? { ...mail, read: true } : mail
      );
      setInboxMails(updatedMails);
      const unread = updatedMails.filter((mail) => !mail.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error updating mail read status:", error);
    }
  };

  const deleteMail = async (mailId) => {
    try {
      await fetch(
        `https://mailboxclient-afc29-default-rtdb.firebaseio.com/email/${mailId}.json`,
        { method: "DELETE" }
      );
      console.log("Mail deleted successfully");

      const updatedMails = inboxMails.filter((mail) => mail.id !== mailId);
      setInboxMails(updatedMails);
      const unread = updatedMails.filter((mail) => !mail.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  return {
    inboxMails,
    unreadCount,
    markMailAsRead,
    deleteMail,
    handleSendMail,
  };
};

export default useMailboxAPI;
