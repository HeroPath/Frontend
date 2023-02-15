import React, { useEffect, useState } from "react";
import "../../styles/styles.css";
import { Table } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { headers, notifySuccess } from "../../../functions/utilities";
import { get, post, deleteRequest } from "../../../functions/requestsApi";

const Mail = () => {
  let mailCounter = 1;

  const [mails, setMails] = useState([]);
  const [sendMail, setSendMail] = useState({
    receiver: "",
    subject: "",
    message: "",
  });

  async function getMails() {
    const responseMails = await get("/api/v1/mails", headers);
    if (responseMails.status === 200) {
      setMails(responseMails.data);
    }
  }

  async function deleteMail(id) {
    const response = await deleteRequest("/api/v1/mails/" + id, headers);
    if (response.status === 200) {
      getMails();
      notifySuccess("#", "Mail deleted successfully");
    }
  }

  async function deleteAllMails() {
    const response = await deleteRequest("/api/v1/mails", headers);
    if (response.status === 200) {
      setMails([])
      notifySuccess("#", "All mails deleted successfully");
    }
  }

  useEffect(() => {
    getMails();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      sendMail.receiver === "" ||
      sendMail.subject === "" ||
      sendMail.message === ""
    )
      return;
    const response = await post("/api/v1/mails/send", sendMail, headers);
    if (response.status === 200) {
      notifySuccess(
        "#",
        "Mail sent successfully",
        "receiver: " + sendMail.receiver
      );
    }
  }

  function handleChange(e) {
    const { target } = e;
    const { name, value } = target;

    const newValues = {
      ...sendMail,
      [name]: value,
    };

    setSendMail(newValues);
  }

  return (
    <div className="mail">
      <h1>Send Mail</h1>
      <form className="mail--form" onSubmit={handleSubmit}>
        <h2>Receiver</h2>
        <input
          type="text"
          id="receiver"
          className="form-control"
          name="receiver"
          value={sendMail.receiver}
          onChange={handleChange}
        />
        <h2>Subject</h2>
        <input
          type="text"
          id="subject"
          className="form-control"
          name="subject"
          value={sendMail.subject}
          onChange={handleChange}
        />
        <h2>Message</h2>
        <input
          type="text"
          id="message"
          className="form-control"
          name="message"
          value={sendMail.message}
          onChange={handleChange}
        />
        <button className="button--links" type="submit">
          Send
        </button>
      </form>
      <div>
        <button className="button--links" onClick={deleteAllMails} style={{padding: "15px"}}>
          {" "}
          Delete All{" "}
        </button>
      </div>

      <h1>Mail</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>From</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mails.map((mail) => (
            <tr key={mail.id}>
              <td>{mailCounter++}</td>
              <td>{mail.sender}</td>
              <td>{mail.subject}</td>
              <td>{mail.message}</td>
              <td>
                <button
                  className="button--links"
                  onClick={() => {
                    deleteMail(mail.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Mail;
