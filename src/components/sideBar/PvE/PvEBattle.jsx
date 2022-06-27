import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";
import UserCard from "../../userProfile/UserCard";

const PvEBattle = () => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

  const location = useLocation();

  const [profile, setProfile] = React.useState({});
  const [battleData, setBattleData] = React.useState([]);

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
    setBattleData(location.state.battleData);
  }, []);

  return (
    <div className="pvebattle">
      <div className="pvebattle--usercard">
        <UserCard profile={profile} />
      </div>
      <div className="pvebattle--npccard">NPCCARD</div>

      <div className="rounds--console">
        {battleData?.map((rounds) => (
          <div className="round" key={rounds.round}>
            <p>Round: {rounds.round}</p>
            <p>User life: {rounds.userLife}</p>
            <p>User dmg: {rounds.userDmg}</p>
            <p>Npc life: {rounds.NpcLife}</p>
            <p>Npc dmg: {rounds.NpcDmg}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PvEBattle;
