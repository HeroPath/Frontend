import { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";

import { post } from "../../functions/requestsApi";
import { headers } from "../../functions/utilities";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { dataStats } from "../../functions/constants";

const UserStats = ({
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
  userNewData,
  updateStats,
}) => {
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
  });

  useEffect(() => {
    if (userNewData) {
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
    <div>
      <section className="userstats">
        <h2>Stats</h2>
        <label className="m-2">Skill points: {stats.freeSkillPoints}</label>

        <form className="userstats--form">
          <div className="userstats--stats">
            <label>Strength: {stats.strength}</label>
            <label>Dexterity: {stats.dexterity}</label>
            <label>Vitality: {stats.vitality}</label>
            <label>Intelligence: {stats.intelligence}</label>
            <label>Luck: {stats.luck}</label>
          </div>

          <div className="userstats--add">
            {dataStats.map((stat) => (
              <div key={stat.skill} className="userstats--add--form">
                <a
                  className="links"
                  onClick={() => {
                    handleClickAddSkill(stat.skill);
                  }}
                >
                  +
                </a>
              </div>
            ))}
          </div>
        </form>

        <div className="userstats--info">
          <label>Defense: {stats.defense}</label>
          <label>Evasion: {stats.evasion}</label>
          <label>Critical Chance: {Math.round(stats.criticalChance * 10) / 10}%</label>
          <label>
            Min/Max DMG: {stats.minDmg}/{stats.maxDmg}
          </label>
          <label>Npc killed: {npcKills}</label>
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
    </div>
  );
};

export default hot(UserStats);
