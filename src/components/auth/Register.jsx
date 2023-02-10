import React, { useEffect } from "react";
import "../styles/styles.css";

import { capitalizeFirstLetter } from "../../functions/utilities";
import { get, post } from "../../functions/requestsApi";
import { notifySuccess } from "../../functions/utilities";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [classData, setClassData] = React.useState([]);

  async function getClasses() {
    const response = await get("/api/v1/classes");
    if (response.status === 200) setClassData(response.data);
  }

  useEffect(() => {
    getClasses();
  }, []);

  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
    className: "",
  });

  function handleChange(e) {
    const { target } = e;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!Object.values(values).every(Boolean)) return;
    values.className = dataClassSelected;
    const response = await post("/api/v1/auth/register", values);
    if (response.status === 200) {
      notifySuccess(
        "/",
        "User created successfully!",
        "Username: " + values.username
      );
    }
  }

  const [dataClassSelected, setDataClassSelected] = React.useState("default");
  const [classSelected, setClassSelected] = React.useState({
    strength: "-",
    dexterity: "-",
    intelligence: "-",
    vitality: "-",
    luck: "-",
  });

  function handleClickClass(e) {
    e.preventDefault();
    const [, className, strength, dexterity, intelligence, vitality, luck] =
      e.target.value.split(",");
    setDataClassSelected(className.toLowerCase());
    setClassSelected({
      class: dataClassSelected,
      strength,
      dexterity,
      intelligence,
      vitality,
      luck,
    });
  }

  return (
    <div className="register--background">
      <div className="register">
        <div className="register--cards">
          <section className="register--cards__form">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <h2 className="mt-4">Username</h2>
              <input
                type="text"
                id="username"
                className="form-control mt-1"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
              <h2 className="mt-2">Email</h2>
              <input
                type="email"
                id="email"
                className="form-control mt-1"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              <h2 className="mt-2">Password</h2>
              <input
                type="password"
                id="password"
                className="form-control mt-1"
                name="password"
                value={values.password}
                onChange={handleChange}
              />

              <button className="button--links mt-2 ps-5 pe-5" type="submit">
                Sign up
              </button>

              <div className="login--footer">
                <p>Are you already registered?</p>
                <a href="/" className="button--links links">
                  Login
                </a>
              </div>
            </form>
          </section>
        </div>
        <div className="register--cards">
          <section className="register--cards__form">
            <h1>Class</h1>
            <select
              className="form-select mt-4"
              name="className"
              value={values.className}
              onChange={handleChange}
              onClick={handleClickClass}
            >
              <option value={["0", "default", "-", "-", "-", "-", "-"]}>
                Select class
              </option>

              {classData?.map((cChar, index) => (
                <option
                  key={index}
                  value={[
                    index,
                    cChar.name,
                    cChar.strength,
                    cChar.dexterity,
                    cChar.intelligence,
                    cChar.vitality,
                    cChar.luck,
                  ]}
                >
                  {capitalizeFirstLetter(cChar.name)}
                </option>
              ))}
            </select>

            {dataClassSelected && (
              <div className="classSelected">
                <div className="classSelected--img">
                  <img
                    src={require("../img/class/" + dataClassSelected + ".webp")}
                    width="250px"
                    height="315px"
                    alt=""
                  />
                </div>
                <div className="classSelected--stats">
                  <h2 className="classSelected--stats__head">
                    {capitalizeFirstLetter(dataClassSelected)}
                  </h2>
                  {dataClassSelected === "default" ? (
                    <label className="classSelected--stats__head">
                      You must select a class to know its story, as well as its
                      corresponding stats...
                    </label>
                  ) : dataClassSelected === "mage" ? (
                    <label className="classSelected--stats__head">
                      In a magical kingdom called Azura, there exists a solitary
                      wizard known as Raven. Despite his dark name, Raven is a
                      wise and just character who uses his magical abilities to
                      protect the inhabitants of the kingdom.
                    </label>
                  ) : dataClassSelected === "warrior" ? (
                    <label className="classSelected--stats__head">
                      In the kingdom of Azura, there exists a legendary warrior
                      known as Thorgrimm. With his sword and shield, Thorgrimm
                      has fought against all kinds of enemies, protecting the
                      kingdom and its inhabitants against oppression and
                      injustice.
                    </label>
                  ) : (
                    dataClassSelected === "archer" && (
                      <label className="classSelected--stats__head">
                        In the kingdom of Azura, there exists a skilled and
                        cunning archer known as Lyra. With her bow and arrows,
                        Lyra is able to hit any target at long range with deadly
                        precision.
                      </label>
                    )
                  )}
                  <label>Strength: {classSelected.strength}</label>
                  <label>Dexterity: {classSelected.dexterity}</label>
                  <label>Intelligence: {classSelected.intelligence}</label>
                  <label>Vitality: {classSelected.vitality}</label>
                  <label>Luck: {classSelected.luck}</label>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

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

export default Register;
