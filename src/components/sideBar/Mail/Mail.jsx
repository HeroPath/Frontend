import React, { useEffect, useState } from "react";
import "../../styles/styles.css";
import { Table } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { headers } from "../../../functions/utilities";
import { get } from "../../../functions/requestsApi";

const Mail = () => {
  let mailCounter = 1;

  const [mails, setMails] = useState([]);

  async function getMails() {
    const responseMails = await get("/api/v1/mails", headers);
    if (responseMails.status === 200) {
      setMails(responseMails.data);
    }
  }

  useEffect(() => {
    getMails();
  }, []);

  return (
    <div className="ranking">
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
