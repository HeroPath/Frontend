import React from "react";
import axios from "axios";
import "./styles/styles.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !(values.username === "") &&
      !(values.email === "") &&
      !(values.password === "")
    ) {
      await axios
        .post("http://localhost:8000/api/v1/auth/register", values)
        .then((response) => {
          if (response.status === 200) {
            navigate("/");
          }
        })
        .catch((err) => alert(err));
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

  return (
    <div className="register" style={cardStyle}>
      <section className="form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          <label className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <label className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button className="btn btn-dark pe-5 ps-5 mt-2" type="submit">
            Sign up
          </button>
          <p>
            Are you already registered?
            <br />
            <span>
              <a href="/">Sign in</a>
            </span>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Register;

const cardStyle = {
  width: "26%",
  textAlign: "center",
  margin: "5% 0% 2% 37%",
  background: "#000",
  color: "white",
};