import { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import "./userStats.css";

import { post } from "../../../functions/requestsApi";
import { headers } from "../../../functions/utilities";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Stat from "./Stat.jsx";

const UserStats = ({ profile, userNewData, updateStats }) => {
  const {
    freeSkillPoints,
    strength,
    dexterity,
    vitality,
    intelligence,
    luck,
    minDmg,
    maxDmg,
    npcKills,
    defense,
    evasion,
    criticalChance,
    hp,
    maxHp,
    aclass,
    pvpLosses,
    pvpWins,
  } = profile;

  const [stats, setStats] = useState({
    freeSkillPoints,
    strength,
    dexterity,
    vitality,
    intelligence,
    luck,
    minDmg,
    maxDmg,
    defense,
    evasion,
    criticalChance,
    hp,
    maxHp,
  });

  useEffect(() => {
    if (userNewData !== false) {
      setStats(userNewData);
    }
  }, [userNewData]);

  async function handleClickAddSkill(skillName) {
    const response = await post("/api/v1/users/add-skill-points/" + skillName, {}, headers);

    if (response.status === 200) {
      setStats(response.data);
      if (updateStats) {
        updateStats(response.data);
      }
    }
  }

  return (
    <>
      <section className="userstats">
        <h2>Stats</h2>
        <label className="m-2">Free skill points: {stats.freeSkillPoints}</label>

        <form className="userstats--form">
          <Stat
            firstStatName={"Strength"}
            FirstStatValue={stats.strength}
            secondStatName={aclass === "warrior" ? "Dmg" : "Defense"}
            secondStatValue={aclass === "warrior" ? `${stats.minDmg}/${stats.maxDmg}` : stats.defense}
            handleClick={handleClickAddSkill}
          />
          <Stat
            firstStatName={"Dexterity"}
            FirstStatValue={stats.dexterity}
            secondStatName={aclass === "archer" ? "Dmg" : "Evasion"}
            secondStatValue={aclass === "archer" ? `${stats.minDmg}/${stats.maxDmg}` : stats.evasion}
            handleClick={handleClickAddSkill}
          />
          <Stat
            firstStatName={"Intelligence"}
            FirstStatValue={stats.intelligence}
            secondStatName={aclass === "mage" ? "Dmg" : aclass === "archer" ? "Evasion" : "Defense"}
            secondStatValue={
              aclass === "mage"
                ? `${stats.minDmg}/${stats.maxDmg}`
                : aclass === "archer"
                ? stats.evasion
                : stats.defense
            }
            handleClick={handleClickAddSkill}
          />
          <Stat
            firstStatName={"Vitality"}
            FirstStatValue={stats.vitality}
            secondStatName={"Life"}
            secondStatValue={`${stats.hp}/${stats.maxHp}`}
            handleClick={handleClickAddSkill}
          />
          <Stat
            firstStatName={"Luck"}
            FirstStatValue={stats.luck}
            secondStatName={"Crit Dmg"}
            secondStatValue={Math.round(stats.criticalChance * 10) / 10 + "%"}
            handleClick={handleClickAddSkill}
          />
        </form>

        <div className="userstats--info">
          <div className="userstats--data">
            <div className="userstats--labels">
              <div className="userstats--dataStat">
                <label>Pvp wins:</label>
                <span>{pvpWins}</span>
              </div>
            </div>
            <div className="userstats--labels">
              <div className="userstats--dataStat">
                <label>Pvp losses:</label>
                <span>{pvpLosses}</span>
              </div>
            </div>

            <div className="userstats--labels">
              <div className="userstats--dataStat">
                <label>Npc killed:</label>
                <span>{npcKills}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
};

export default hot(UserStats);
