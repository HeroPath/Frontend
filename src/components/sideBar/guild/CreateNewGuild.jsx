import React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import env from "react-dotenv";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNewGuild = () => {
  const cookies = new Cookies();

  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

  const [values, setValues] = React.useState({
    name: "",
    description: "",
    tag: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !(values.name === "") &&
      !(values.description === "") &&
      !(values.tag === "")
    ) {
      await axios
        .post(env.API_URL + "/api/v1/guilds", values, { headers })
        .then((response) => {
          if (response.status === 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          if (err.request.status !== 0) {
            notify(err.response.data.message);
            setTimeout(() => {
              window.location.reload();
            }, [2500]);
          }
        });
    }
  }

  function handleChange(e) {
    const { target } = e;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
  }

  const notify = (alert) => {
    toast.error(alert, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      <section>
        <h1>Create a new guild</h1>
        <h2>Requirements:</h2>
        <h3>Level: 100</h3>
        <h3>Gold: 100.000</h3>
        <h3>Diamonds: 50</h3>
        <form onSubmit={handleSubmit}>
          <label className="form-label mt-3">Name</label>
          <input
            type="text"
            id="name"
            className="form-control mt-2"
            name="name"
            value={values.name}
            onChange={handleChange}
          />

          <label className="form-label mt-3">Tag</label>
          <input
            type="text"
            id="tag"
            className="form-control mt-2"
            name="tag"
            value={values.tag}
            onChange={handleChange}
          />

          <label className="form-label mt-3">Description</label>
          <input
            type="text"
            id="description"
            className="form-control mt-2"
            name="description"
            value={values.description}
            onChange={handleChange}
          />

          <button className="pe-5 ps-5 mt-4 btn btn-success" type="submit">
            Create
          </button>
        </form>
      </section>
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

export default CreateNewGuild;
