import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import "./styles/styles.css";
import UserCard from "./UserCard";

const Profile = () => {
  const cookies = new Cookies();
  const headers = {
    Authorization: "Bearer " + cookies.get("token"),
  };

  const [profile, setProfile] = React.useState({});

  async function handleData() {
    await axios
      .get("https://ao-web.herokuapp.com/api/v1/users/profile", { headers })
      .then(async (response) => {
        if (response.status === 200) {
          setProfile(response.data);
        }
      });
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div>
      <h1 className="titleProfile">Character stats</h1>
      <UserCard profile={profile} />
      <form>
        <button className="btn btn-dark m-2" type="submit">
          <a href="/playervsnpc" className="links">
            NPC
          </a>
        </button>
      </form>
    </div>
  );
};

export default Profile;
