import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import "../styles/styles.css";
import ProfileCard from "./ProfileCard";
import Navbar from "./Navbar";
import env from "react-dotenv";

const Profile = () => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

  const [profile, setProfile] = React.useState({});
  async function handleData() {
    await axios
      .get(env.API_URL + "/api/v1/users/profile", { headers })
      .then(async (response) => {
        if (response.status === 200) {
          response.data.username = response.data.username.replace(
            /(^\w{1})/g,
            (letter) => letter.toUpperCase()
          );
          setProfile(response.data);
          console.log(response.data);
        }
      });
  }

  useEffect(() => {
    handleData();
    
  }, []);

  return (
    <div className="profile">
      <Navbar
        gold={profile.gold}
        diamond={profile.diamond}
        role={profile.role}
      />
      <h1 className="titleProfile">Character stats</h1>
      <ProfileCard profile={profile} />
    </div>
  );
};

export default Profile;
