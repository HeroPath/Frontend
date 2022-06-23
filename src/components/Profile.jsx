import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import "./styles/styles.css";
import UserCard from "./UserCard";

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
          <label>☼{profile.gold}</label>
          <label>♦{profile.diamond}</label>
          <label>Role: {profile.roleName}</label>
        </div>
        <div>SERVER STATUS</div>
        <div>NEWS</div>
      </div>
      <h1 className="titleProfile">Character stats</h1>
      <UserCard profile={profile} />
    </div>
  );
};

export default Profile;
