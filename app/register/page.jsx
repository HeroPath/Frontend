"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { notifySuccess } from "../../functions/utilities";
import { GET, POST } from "../api/route";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/login/auth.css";

const Register = () => {
  const [classData, setClassData] = useState([]);

  async function getClasses() {
    const response = await GET("/api/v1/classes");
    if (response.status === 200) setClassData(response.data);
  }

  useEffect(() => {
    getClasses();
  }, []);

  const [dataRegister, setDataRegister] = useState({
    username: "",
    email: "",
    password: "",
    className: "",
  });

  function handleChange(e) {
    setDataRegister({ ...dataRegister, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!Object.values(dataRegister).every(Boolean)) return;
    dataRegister.className = dataClassSelected;
    const response = await POST("/api/v1/auth/register", dataRegister);
    if (response.status === 200) {
      notifySuccess("/", "User created successfully!", "Username: " + dataRegister.username);
    }
  }

  const [dataClassSelected, setDataClassSelected] = useState("default");
  const [classSelected, setClassSelected] = useState({
    strength: "-",
    dexterity: "-",
    intelligence: "-",
    vitality: "-",
    luck: "-",
  });

  function handleClickClass(e) {
    e.preventDefault();
    const [, className, strength, dexterity, intelligence, vitality, luck] = e.target.value.split(",");
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
              <h3 className="mt-4">Username</h3>
              <input
                type="text"
                id="username"
                className="inputForm mt-1"
                name="username"
                value={dataRegister.username}
                onChange={handleChange}
              />
              <h3 className="mt-2">Email</h3>
              <input
                type="email"
                id="email"
                className="inputForm mt-1"
                name="email"
                value={dataRegister.email}
                onChange={handleChange}
              />
              <h3 className="mt-2">Password</h3>
              <input
                type="password"
                id="password"
                className="inputForm mt-1"
                name="password"
                value={dataRegister.password}
                onChange={handleChange}
              />

              <button className="button--links mt-4 ps-5 pe-5" type="submit">
                Sign up
              </button>

              <div className="register--footer">
                <label>Are you already registered?</label>
                <Link href="/" className="button--links ps-4 pe-4">
                  Login
                </Link>
              </div>
            </form>
          </section>
        </div>
        <div className="register--cards">
          <section className="register--cards__form">
            <h1>Class</h1>
            <select
              className="selectClass mt-4"
              name="className"
              value={dataRegister.className}
              onChange={handleChange}
              onClick={handleClickClass}
            >
              <option value={["0", "default", "-", "-", "-", "-", "-"]}>Select class</option>

              {classData?.map((cChar, index) => (
                <option
                  key={index}
                  value={[
                    index,
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
                  <Image
                    src={require("../../public/img/class/" + dataClassSelected + ".webp")}
                    width={250}
                    height={315}
                    alt="Class"
                  />
                </div>
                <div className="classSelected--stats">
                  <h3 className="classSelected--stats__head">{dataClassSelected}</h3>
                  {dataClassSelected === "default" ? (
                    <label className="classSelected--stats__head">
                      You must select a class to know its story, as well as its corresponding stats...
                    </label>
                  ) : dataClassSelected === "mage" ? (
                    <label className="classSelected--stats__head">
                      In a magical kingdom called Azura, there exists a solitary wizard known as Raven. Despite his dark
                      name, Raven is a wise and just character who uses his magical abilities to protect the inhabitants
                      of the kingdom.
                    </label>
                  ) : dataClassSelected === "warrior" ? (
                    <label className="classSelected--stats__head">
                      In the kingdom of Azura, there exists a legendary warrior known as Thorgrimm. With his sword and
                      shield, Thorgrimm has fought against all kinds of enemies, protecting the kingdom and its
                      inhabitants against oppression and injustice.
                    </label>
                  ) : (
                    dataClassSelected === "archer" && (
                      <label className="classSelected--stats__head">
                        In the kingdom of Azura, there exists a skilled and cunning archer known as Lyra. With her bow
                        and arrows, Lyra is able to hit any target at long range with deadly precision.
                      </label>
                    )
                  )}
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
