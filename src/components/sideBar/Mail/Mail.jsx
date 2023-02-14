import React, { useEffect, useState } from "react";
import "../../styles/styles.css";
import { Table } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { headers } from "../../../functions/utilities";
import { get, post } from "../../../functions/requestsApi";

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
    await post("/api/v1/mails/send", sendMail, headers);
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

      <h1>Mail</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>From</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {mails.map((mail, index) => (
            <tr key={index}>
              <td>{mailCounter++}</td>
              <td>{mail.sender}</td>
              <td>{mail.subject}</td>
              <td>{mail.message}</td>
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
