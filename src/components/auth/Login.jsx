import { useState, useEffect } from "react";

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
    const response = await get("/api/v1/stats");

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
            <button className="button--links mt-4 ps-5 pe-5" type="submit">
              Sign in
            </button>
          </form>
          <div className="login--footer mt-4">
            <a href="/register" className="button--links links p-3 ps-5 pe-5" style={{ marginRight: "2%" }}>
              Register
            </a>
            <a href="" className="button--links links p-3 ps-5 pe-5">
              Forgot pass?
            </a>
          </div>
          {serverStats.status === "Online" ? (
            <div className="login--stats">
              <div>
                <label>Server status: </label>
                <img className="ms-2" src={require(`../../img/utilities/online.webp`)} height="16px" width="16px" alt="" />
              </div>
              <div>
                <label>Registered Users: {serverStats.userRegistered}</label>
              </div>
              <div>
                <label>Exp. Mult.: {serverStats.expMultiplier}x</label>
              </div>
              <div>
                <label>Gold Mult.: {serverStats.goldMultiplier}x</label>
              </div>
              <div>
                <label>Level Max: {serverStats.lvlMax}</label>
              </div>
            </div>
          ) : (
            <div className="login--stats">
              <label>Server status: </label>
              <img className="ms-2" src={require(`../../img/utilities/offline.webp`)} height="16px" width="16px" alt="" />
            </div>
          )}
        </section>
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
