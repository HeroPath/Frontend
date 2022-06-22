import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "./styles/styles.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [dataLogin, setDataLogin] = React.useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const cookies = new Cookies();
  cookies.remove("token")
  cookies.remove("username")

  async function handleSubmit(e) {
    e.preventDefault();

    if (!(dataLogin.username === "") && !(dataLogin.password === "")) {
      await axios
        .post("https://ao-web.herokuapp.com/api/v1/auth/login", dataLogin)
        .then((response) => {
          if (response.status === 200) {
            cookies.set("token", response.data.token);
            cookies.set("username", dataLogin.username);
            navigate("/profile");
          }
        });
    }
  }

  function handleChange(e) {
    const { target } = e;
    const { name, value } = target;

    const newValues = {
      ...dataLogin,
      [name]: value,
    };

    setDataLogin(newValues);
  }

  return (
    <div className="login" style={cardStyle}>
      <section className="form">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            name="username"
            value={dataLogin.username}
            onChange={handleChange}
          />
          <label className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={dataLogin.password}
            onChange={handleChange}
          />
          <button className="btn btn-dark mt-2 ps-5 pe-5" type="submit">
            Sign in
          </button>
        </form>
        <p>
          Need an Account?
          <br />
          <span>
            <a href="/register">Sign up</a>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;

const cardStyle = {
  width: "20%",
  textAlign: "center",
  margin: "10% 0% 2% 40%",
  background: "#000",
  color: "white",
};
