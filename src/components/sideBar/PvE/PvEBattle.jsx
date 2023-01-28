import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";
import UserCard from "../../userProfile/UserCard";
import NpcCard from "./NpcCard";
import env from "react-dotenv";

import "../../utilities.js";

const PvEBattle = () => {
  /* --------------- DECLARATION ----------------------*/
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };
  const location = useLocation();
  const [profile, setProfile] = useState({});
  const [battleData, setBattleData] = useState([]);
  const [winnerBattle, setWinnerBattle] = useState({});
  let i = 1;

  const npcName = location.state.battleData.nameData.replace(
    /(^\w{1})/g,
    (letter) => letter.toUpperCase()
  );

  /* --------------- //DECLARATION ----------------------*/

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
        }
      });
  }

  useEffect(() => {
    handleData();
    setWinnerBattle(location.state.battleData.pop());
    setBattleData(location.state.battleData);
  }, []);

  return (
    <div className="battle">
      <div className="battle--usercard">
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
      <div className="battle--npccard">
        <NpcCard />
      </div>

      <div className="rounds--console">
        <div className="history-box">
          {battleData?.map((rounds) => (
            <ul key={i++} className="round">
              <h6>Round: {rounds.round}</h6>
              <div>
                <li>
                  {profile.username} has attacked {npcName} for{" "}
                  {rounds.attackerDmg.toLocaleString()} damage. ({npcName} has {rounds.NpcLife.toLocaleString()}{" "}
                  life)
                </li>
                <li>
                  {npcName} has attacked {profile.username} for {rounds.NpcDmg.toLocaleString()}{" "}
                  damage. ({profile.username} has {rounds.attackerLife.toLocaleString()} life)
                </li>
              </div>
            </ul>
          ))}
          {winnerBattle && (
            <ul className="round winner">
              <h6>Final</h6>
              <div>
                <li>Winner: {winnerBattle.win}</li>
                <li>Loser: {winnerBattle.lose}</li>
                {winnerBattle.userExperienceGain && (
                  <li>
                    Experience gained:{" "}
                    {winnerBattle.userExperienceGain.toLocaleString()}
                  </li>
                )}
                {winnerBattle.goldAmountWin && (
                  <li>
                    Gold won: {winnerBattle.goldAmountWin.toLocaleString()}
                  </li>
                )}

                {winnerBattle.diamondsAmonutWin && (
                  <li>Diamond won: {winnerBattle.diamondsAmonutWin}</li>
                )}
                {winnerBattle.levelUp === true && (
                  <li>
                    Congratulations, you have reached level {profile.level}
                  </li>
                )}
              </div>
            </ul>
          )}
        </div>
        <a
          href="/profile"
          className="button--links links m-2 pe-5 ps-5"
          style={{ backgroundColor: "lightBlue" }}
        >
          Profile
        </a>
      </div>
    </div>
  );
};

export default PvEBattle;
