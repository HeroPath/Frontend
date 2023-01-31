import { hot } from "react-hot-loader/root";
import React, { useEffect, useState } from "react";
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
}) => {
  const data = [
    { id: 1, skill: "strength" },
    { id: 2, skill: "dexterity" },
    { id: 3, skill: "vitality" },
    { id: 4, skill: "intelligence" },
    { id: 5, skill: "luck" },
  ];

  const [clickAddSkill, setClickAddSkill] = React.useState({
    stat: "",
    amount: 0,
  });

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

  async function handleClickAddSkill(e) {
    e.preventDefault();
    const response = await post(
      "/api/v1/users/add-skill-points",
      { skillPointName: clickAddSkill.stat, amount: clickAddSkill.amount },
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

  function handleChangeAmount(e) {
    if (e.target.value < 0) {
      e.target.value = e.target.value * -1;
    } else if (e.target.value > freeSkillPoints) {
      e.target.value = freeSkillPoints;
    }

    const newValues = {
      stat: e.target.id,
      amount: e.target.value,
    };

    setClickAddSkill(newValues);
  }

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) handleClickAddSkill();
  };

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
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChangeAmount}
                  onKeyDown={handleKeyPress}
                  id={zone.skill}
                  min="1"
                  max={stats.freeSkillPoints}
                  pattern="^[0-9]+"
                />
                <img
                  onClick={handleClickAddSkill}
                  src={require("../img/utilities/addStats.webp")}
                />
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
