import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";

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
  cookies.remove("guildName");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!(dataLogin.username === "") && !(dataLogin.password === "")) {
      await axios
        .post(env.API_URL + "/api/v1/auth/login", dataLogin)
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
      <div className="login--banner">
        <section className="login--section">
          <form className="login--form" onSubmit={handleSubmit}>
            <h2>Username</h2>
            <input
              type="text"
              id="username"
              className="form-control"
              name="username"
              value={dataLogin.username}
              onChange={handleChange}
            />
            <h2>Password</h2>
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
            <a href="/register" className="button--links links p-2 ps-5 pe-5">
              Register
            </a>
            <a href="" className="button--links links p-2 ps-5 pe-5">
              Forgot password?
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
    </div>
  );
};

export default Login;

const cardStyle = {};
