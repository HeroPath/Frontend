import React, { useEffect, useState } from "react";
import "../../styles/styles.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { headers } from "../../../functions/utilities";
import { get } from "../../../functions/requestsApi";

const Mail = () => {
  let guildsCounter = 1;

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
