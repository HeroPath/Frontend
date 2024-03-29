import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./mail.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { headers, notifySuccess } from "../../functions/utilities";
import { get, post, deleteRequest } from "../../functions/requestsApi";

const Mail = () => {
  let mailCounter = 1;

  const [mails, setMails] = useState([]);
  const [dataMail, setDataMail] = useState({
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
      setMails([]);
      notifySuccess("#", "All mails deleted successfully");
    }
  }

  useEffect(() => {
    getMails();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (dataMail.receiver === "" || dataMail.subject === "" || dataMail.message === "") return;
    const response = await post("/api/v1/mails/send", dataMail, headers);
    if (response.status === 200) {
      notifySuccess("#", "Mail sent successfully", "receiver: " + dataMail.receiver);
    }
  }

  function handleChange(e) {
    setDataMail({ ...dataMail, [e.target.name]: e.target.value });
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
          value={dataMail.receiver}
          onChange={handleChange}
        />
        <h2>Subject</h2>
        <input
          type="text"
          id="subject"
          className="form-control"
          name="subject"
          value={dataMail.subject}
          onChange={handleChange}
        />
        <h2>Message</h2>
        <input
          type="text"
          id="message"
          className="form-control"
          name="message"
          value={dataMail.message}
          onChange={handleChange}
        />
        <button className="button--links" type="submit">
          Send
        </button>
      </form>
      {mails.length > 0 && (
        <div>
          <div>
            <button className="button--links" onClick={deleteAllMails} style={{ padding: "15px" }}>
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
        </div>
      )}
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
