import React, { useState, useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { headers, notifySuccess } from "../../../functions/utilities";
import { post, get } from "../../../functions/requestsApi";

const CreateNewGuild = () => {
  const [requirementesCreateGuild, setRequirementesCreateGuild] = useState({});
  const [values, setValues] = useState({
    name: "",
    description: "",
    tag: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (values.name && values.description && values.tag) {
      const response = await post("/api/v1/guilds", values, headers);
      if (response.status === 200) {
        notifySuccess("/Guild", "Guild created successfully!", "Name: " + values.name, "Tag: " + values.tag);
      }
    }
  }

  async function getRequirementesCreateGuild() {
    const response = await get("/api/v1/guilds/requirements", headers);
    if (response.status === 200) {
      console.log(response.data);
      setRequirementesCreateGuild(response.data);
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

  useEffect(() => {
    getRequirementesCreateGuild();
  }, []);

  return (
    <div>
      {requirementesCreateGuild && (
        <section>
          <h1>Create a new guild</h1>
          <h2>Requirements:</h2>
          <h3>Level: {requirementesCreateGuild.lvl}</h3>

          <h3>Gold: {requirementesCreateGuild.gold && requirementesCreateGuild.gold.toLocaleString()}</h3>
          <h3>Diamonds: {requirementesCreateGuild.diamonds && requirementesCreateGuild.diamonds.toLocaleString()}</h3>
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

export default CreateNewGuild;
