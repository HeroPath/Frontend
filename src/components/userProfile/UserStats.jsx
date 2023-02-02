import { hot } from "react-hot-loader/root";
import React, { useState } from "react";
import "../styles/styles.css";

import { post } from "../../functions/requestsApi";
import { headers } from "../../functions/utilities";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  userStats,
}) => {
  const data = [
    { id: 1, skill: "strength" },
    { id: 2, skill: "dexterity" },
    { id: 3, skill: "vitality" },
    { id: 4, skill: "intelligence" },
    { id: 5, skill: "luck" },
  ];

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

  if (userStats !== undefined) {
    stats.strength = userStats.newStrength;
    stats.dexterity = userStats.newDexterity;
    stats.vitality = userStats.newVitality;
    stats.intelligence = userStats.newIntelligence;
    stats.luck = userStats.newLuck;
    stats.minDmg = userStats.newMinDmg;
    stats.maxDmg = userStats.newMaxDmg;
    stats.defense = userStats.newDefense;
    stats.evasion = userStats.newEvasion;
    stats.criticalChance = userStats.newCriticalChance;
  }

  async function handleClickAddSkill(skillName) {
    const response = await post(
      "/api/v1/users/add-skill-points/" + skillName,
      {},
      headers
    );

    if (response.status === 200) {
      setStats({
        freeSkillPoints: response.data.freeSkillPoints,
        strength: response.data.strength,
        dexterity: response.data.dexterity,
        vitality: response.data.vitality,
        intelligence: response.data.intelligence,
        luck: response.data.luck,
        minDmg: response.data.minDmg,
        maxDmg: response.data.maxDmg,
        defense: response.data.defense,
        evasion: response.data.evasion,
        criticalChance: response.data.criticalChance,
      });
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
            {data.map((zone) => (
              <div key={zone.id} className="userstats--add--form">
                <a
                  className="links"
                  onClick={() => {
                    handleClickAddSkill(zone.skill);
                  }}
                  href="#"
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
          <label>
            Critical Chance: {Math.round(stats.criticalChance * 10) / 10}%
          </label>
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
