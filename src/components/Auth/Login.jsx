import { useState, useEffect } from "react";
import "./auth.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { post, get } from "../../functions/requestsApi";
import { cookies } from "../../functions/utilities";

const Login = () => {
  const [dataLogin, setDataLogin] = useState({
    username: "",
    password: "",
  });

  const [serverStats, setServerStats] = useState({});

  ["token", "username", "guildName"].forEach((cookie) => cookies.remove(cookie));

  async function getServerStats() {
    const response = await get("/api/v1/stats/server");

    if (response.status === 200) {
      response.data.status = "Online";
      setServerStats(response.data);
    }
  }

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
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    getServerStats();
  }, []);

  return (
    <div className="login">
      <div className="login--banner">
        <section className="login--section">
          <form className="login--form" onSubmit={handleSubmit}>
            <h3>Username</h3>
            <input
              type="text"
              className="p-2"
              id="username"
              name="username"
              value={dataLogin.username}
              onChange={handleChange}
            />
            <h3>Password</h3>
            <input
              type="password"
              className="p-2"
              id="password"
              name="password"
              value={dataLogin.password}
              onChange={handleChange}
            />
            <button className="button--links mt-4 pe-5 ps-5" type="submit">
              Sign in
            </button>
          </form>
          <div className="login--footer mt-4">
            <a href="/register" className="button--links me-4 pe-4 ps-4">
              Register
            </a>
            <a className="button--links pe-4 ps-4">Forgot pass?</a>
          </div>
        </section>
        {serverStats.status === "Online" ? (
          <div className="login--stats">
            <div className="login--divStat">
              <label>Server status: </label>
              <img
                className="ms-2"
                src={require(`../../img/utilities/online.webp`)}
                height="16px"
                width="16px"
                alt=""
              />
            </div>
            <div className="login--divStat">
              <label>Registered Users:</label>
              <span>{serverStats.userRegistered}</span>
            </div>
            <div className="login--divStat">
              <label>Exp. Mult.:</label>
              <span>{serverStats.expMultiplier}x</span>
            </div>
            <div className="login--divStat">
              <label>Gold Mult.: </label>
              <span>{serverStats.goldMultiplier}x</span>
            </div>
            <div className="login--divStat">
              <label>Level Max:</label>
              <span>{serverStats.lvlMax}</span>
            </div>
          </div>
        ) : (
          <div className="login--stats">
            <label>Server status: </label>
            <img className="ms-2" src={require(`../../img/utilities/offline.webp`)} height="16px" width="16px" alt="" />
          </div>
        )}
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

export default Login;
