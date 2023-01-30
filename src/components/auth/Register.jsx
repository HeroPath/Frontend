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
    if (response.status === 200) {
      setClassData(response.data);
    }
  }

  useEffect(() => {
    getClasses();
  }, []);

  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
    classId: "",
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

    values.classId = parseInt(values.classId);
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
              <label className="form-label mt-2">Username</label>
              <input
                type="text"
                id="username"
                className="form-control mt-2"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
              <label className="form-label mt-2">Email</label>
              <input
                type="email"
                id="email"
                className="form-control mt-2"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              <label className="form-label mt-2">Password</label>
              <input
                type="password"
                id="password"
                className="form-control mt-2"
                name="password"
                value={values.password}
                onChange={handleChange}
              />

              <button className="button--links pe-5 ps-5 mt-4" type="submit">
                Sign up
              </button>

              <div className="login--footer">
                <p>Are you already registered?</p>
                <a href="/" className="button--links links">
                  LOGIN
                </a>
              </div>
            </form>
          </section>
        </div>
        <div className="register--cards">
          <section className="register--cards__form">
            <h2>Class</h2>
            <select
              className="form-select"
              name="classId"
              value={values.classId}
              onChange={handleChange}
              onClick={handleClickClass}
            >
              <option value={["0", "default", "-", "-", "-", "-", "-"]}>
                Select class
              </option>

              {classData?.map((cChar) => (
                <option
                  key={cChar.id}
                  value={[
                    cChar.id,
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
                  <label className="classSelected--stats__head">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    laboriosam perferendis ex illum enim similique, fugit
                    ratione nisi quasi ipsam?
                  </label>
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
