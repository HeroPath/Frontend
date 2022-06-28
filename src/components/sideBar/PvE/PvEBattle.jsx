import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";
import UserCard from "../../userProfile/UserCard";
import NpcCard from "./NpcCard";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const PvEBattle = () => {
  /* --------------- DECLARATION ----------------------*/

  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };
  const location = useLocation();
  const [profile, setProfile] = React.useState({});
  const [battleData, setBattleData] = React.useState([]);
  let i = 1;
  const npcName = location.state.battleData.nameData.replace(
    /(^\w{1})/g,
    (letter) => letter.toUpperCase()
  );

  /* --------------- //DECLARATION ----------------------*/

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

  /* --------------- FILTER ARRAY OBJECT ----------------------*/

  let winner = {};

  for (let i = battleData.length - 1; i < battleData.length; i++) {
    winner = battleData[i];
  }

  let roundsData = battleData.filter((r) => r.round);

  /* --------------- //FILTER ARRAY OBJECT ----------------------*/

  return (
    <div className="pvebattle">
      <div className="pvebattle--usercard">
        {profile.aclass && (
          <UserCard
            key={profile.username}
            username={profile.username}
            aclass={profile.aclass}
            hp={profile.hp}
            maxHp={profile.maxHp}
            experience={profile.experience}
            experienceToNextLevel={profile.experienceToNextLevel}
            level={profile.level}
          />
        )}
      </div>
      <div className="pvebattle--npccard">
        <NpcCard />
      </div>

      <div className="rounds--console">
        <div className="history-box">
          {roundsData?.map((rounds) => (
            <ul key={i++} className="round">
              <h6>Round: {rounds.round}</h6>
              <div>
                <li>
                  {profile.username} has attacked {npcName} for {rounds.userDmg}{" "}
                  damage. ({npcName} has {rounds.NpcLife} life)
                </li>
                <li>
                  {npcName} has attacked {profile.username} for {rounds.npcDmg}
                  damage. ({profile.username} has {rounds.userLife} life)
                </li>
              </div>
            </ul>
          ))}
          {winner && (
            <ul className="round">
              <h6>Final</h6>
              <div>
                <li>Winner: {winner.win}</li>
                <li>Loser: {winner.lose}</li>
                <li>Gold won: {winner.goldAmountWin}</li>
              </div>
            </ul>
          )}
        </div>
        <a href="/profile" className="button--links links m-3 pe-5 ps-5">
          Profile
        </a>
      </div>
    </div>
  );
};

export default PvEBattle;
