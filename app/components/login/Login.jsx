"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { POST } from "../../api/route";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { cookies } from "@/functions/utilities";

import { useDispatch, useSelector } from "react-redux";
import { fetchServerStatus } from "@/store/slice";

const Login = () => {
  const dispatch = useDispatch();
  const serverStats = useSelector((state) => state.Slice.serverStatus);

  ["token", "username", "guildName"].forEach((cookie) => cookies.remove(cookie));

  const [dataLogin, setDataLogin] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    dispatch(fetchServerStatus());
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (dataLogin.username === "" || dataLogin.password === "") return;
    const response = await POST("/api/v1/auth/login", dataLogin);

    if (response.status === 200) {
      cookies.set("token", response.data.token, { path: "/" });
      cookies.set("username", dataLogin.username, { path: "/" });
      window.location.href = "/profile";
    }
  }

  function handleChange(e) {
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
  }

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
            <Link href="/register" className="button--links me-4 pe-4 ps-4">
              Register
            </Link>
            <Link href="/" className="button--links pe-4 ps-4">
              Forgot pass?
            </Link>
          </div>
        </section>
        {serverStats.status === "Online" ? (
          <div className="login--stats">
            <div className="login--divStat">
              <label>Server status: </label>
              <Image
                className="ms-2"
                src={require("@/public/img/utilities/online.webp")}
                width={16}
                height={16}
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
            <div className="login--divStat">
              <label>Server status: </label>
              <Image
                className="ms-2"
                src={require("@/public/img/utilities/offline.webp")}
                width={16}
                height={16}
                alt=""
              />
            </div>
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
