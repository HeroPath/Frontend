import React, { useEffect } from "react";
import axios from "axios";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
    classId: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !(values.username === "") &&
      !(values.email === "") &&
      !(values.classId === "" || values.classId === "0") &&
      !(values.password === "")
    ) {
      values.classId = parseInt(values.classId);
      await axios
        .post(env.API_URL + "/api/v1/auth/register", values)
        .then((response) => {
          if (response.status === 200) {
            navigate("/");
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

  const [classData, setClassData] = React.useState([]);

  async function handleData() {
    await axios
      .get(env.API_URL + "/api/v1/classes")
      .then((response) => {
        if (response.status === 200) {
          setClassData(response.data);
        }
      });
  }

  useEffect(() => {
    handleData();
  }, []);

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

    const res = e.target.value;
    const resSplited = res.split(",");

    setDataClassSelected(resSplited[1].toLowerCase());
    setClassSelected({
      class: dataClassSelected,
      strength: resSplited[2],
      dexterity: resSplited[3],
      intelligence: resSplited[4],
      vitality: resSplited[5],
      luck: resSplited[6],
    });
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
                <a href="/" className="button--links">
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
                  {cChar.name}
                </option>
              ))}
            </select>

            {dataClassSelected && (
              <div className="classSelected">
                <div className="classSelected--img">
                  <img
                    src={require("../img/class/" + dataClassSelected + ".jpg")}
                    width="250px"
                    height="315px"
                    alt=""
                  />
                </div>
                <div className="classSelected--stats">
                  <h2 className="classSelected--stats__head">
                    {dataClassSelected}
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
