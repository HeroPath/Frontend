import React from "react";
import "../styles/styles.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { post } from "../../functions/requestsApi";
import { cookies } from "../../functions/utilities";

const Login = () => {
  const [dataLogin, setDataLogin] = React.useState({
    username: "",
    password: "",
  });

  ["token", "username", "guildName"].forEach((cookie) =>
    cookies.remove(cookie)
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (dataLogin.username === "" || dataLogin.password === "") return;

    const response = await post("/api/v1/auth/login", dataLogin);

    if (response.status === 200) {
      cookies.set("token", response.data.token, { path: "/" });
      cookies.set("username", dataLogin.username, { path: "/" });
      window.location.href = "/profile";
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
