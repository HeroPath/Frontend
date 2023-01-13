import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [dataLogin, setDataLogin] = React.useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const cookies = new Cookies();
  cookies.remove("token");
  cookies.remove("username");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!(dataLogin.username === "") && !(dataLogin.password === "")) {
      await axios
        .post("http://localhost:8000/api/v1/auth/login", dataLogin)
        .then((response) => {
          if (response.status === 200) {
            cookies.set("token", response.data.token);
            cookies.set("username", dataLogin.username);
            navigate("/profile", { replace: true });
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
      ...dataLogin,
      [name]: value,
    };

    setDataLogin(newValues);
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
    <div className="login" style={cardStyle}>
      <div className="login--img" />
      <section className="login--section">
        <h1>Sign In</h1>
        <form className="login--form" onSubmit={handleSubmit}>
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
          <button className="button--links mt-2 ps-5 pe-5" type="submit">
            Sign in
          </button>
        </form>
        <div className="login--footer mt-4">
          <a href="/register" className="button--links">
            REGISTER
          </a>
          <a href="" className="button--links">
            FORGOT PASSWORD
          </a>
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
      </section>
    </div>
  );
};

export default Login;

const cardStyle = {};
