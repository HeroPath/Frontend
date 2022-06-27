import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";

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

  console.log(profile);

  useEffect(() => {
    handleData();
    setBattleData(location.state.battleData);
  }, []);

  return (
    <div className="pvebattle">
      {battleData?.map((rounds) => (
        <div className="rounds" key={rounds.round}>
          <h6>Round: {rounds.round}</h6>
          <p>User life: {rounds.userLife}</p>
          <p>User dmg: {rounds.userDmg}</p>
          <p>Npc life: {rounds.NpcLife}</p>
          <p>Npc dmg: {rounds.NpcDmg}</p>
        </div>
      ))}
    </div>
  );
};

export default PvEBattle;
