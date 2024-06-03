import { useState, useEffect } from "react";

const useMailboxAPI = () => {
  const [inboxMails, setInboxMails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const userEmail = localStorage.getItem("userEmail");

  const fetchInboxMails = async () => {
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
    fetchInboxMails();
  }, []);

  const markMailAsRead = async (mailId) => {
    const updatedMails = inboxMails.map((mail) =>
      mail.id === mailId ? { ...mail, read: true } : mail
    );
    setInboxMails(updatedMails);

    try {
      await fetch(
        `https://mailboxclient-afc29-default-rtdb.firebaseio.com/email/${mailId}.json`,
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

    const unread = updatedMails.filter((mail) => !mail.read).length;
    setUnreadCount(unread);
  };

  const deleteMail = async (mailId) => {
    try {
      await fetch(
        `https://mailboxclient-afc29-default-rtdb.firebaseio.com/email/${mailId}.json`,
        {
          method: "DELETE",
        }
      );
      const updatedMails = inboxMails.filter((mail) => mail.id !== mailId);
      setInboxMails(updatedMails);
      const unread = updatedMails.filter((mail) => !mail.read).length;
      setUnreadCount(unread);
      console.log("Mail deleted successfully");
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  return { inboxMails, unreadCount, markMailAsRead, deleteMail };
};

export default useMailboxAPI;
