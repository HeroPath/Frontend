import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import "../styles/styles.css";
import ProfileCard from "./ProfileCard";

const Profile = () => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

  const [profile, setProfile] = React.useState({});

  async function handleData() {
    await axios
      .get("https://ao-web.herokuapp.com/api/v1/users/profile", { headers })
      .then(async (response) => {
        if (response.status === 200) {
          response.data.username = response.data.username.replace(
            /(^\w{1})/g,
            (letter) => letter.toUpperCase()
          );
          setProfile(response.data);
        }
      });
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="profile">
      <div className="profileNavbar">
        <div className="profileNavbar--labels">
          <div>
            <img
              className="me-2"
              src={require(`../img/utilities/gold.png`)}
              alt=""
            />
            <label>{profile.gold}</label>
          </div>
          <div>
            <img
              className="me-2"
              src={require(`../img/utilities/diamond.png`)}
              alt=""
            />
            <label>{profile.diamond}</label>
          </div>
          {profile.role && <label>Role: {profile.role.roleName}</label>}
        </div>
        <div className="divsss">
          <label style={{ height: "32px" }}>SERVER STATUS</label>
          <img
            className="ms-2 mb-1"
            src={require(`../img/utilities/online.png`)}
            height="16px"
            width="16px"
            alt=""
          />
        </div>
        <div className="divsss">
          <label>NEWS</label>
        </div>
      </div>
      <h1 className="titleProfile">Character stats</h1>
      <ProfileCard profile={profile} />
    </div>
  );
};

export default Profile;
