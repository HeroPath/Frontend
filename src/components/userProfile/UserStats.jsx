import { hot } from "react-hot-loader/root";
import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "../styles/styles.css";
import env from "react-dotenv";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fontSize, fontWeight } from "@mui/system";

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
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

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

  async function handleClickAddSkill() {
    await axios
      .post(
        env.API_URL + "/api/v1/users/add-skill-points",
        { skillPointName: clickAddSkill.stat, amount: clickAddSkill.amount },
        { headers }
      )
      .then(async (response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.request.status !== 0) {
          notify(err.response.data.message);
          setTimeout(() => {}, [2500]);
        }
      });
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

  const [showAddStat, setShowAddStat] = React.useState(false);

  function showAddPoints() {
    if (freeSkillPoints > 0) {
      setShowAddStat(!showAddStat);
    }
  }

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) handleClickAddSkill();
  };

  useEffect(() => {
    showAddPoints();
  }, []);

  const notify = (alert) => {
    toast.error(alert, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      <section className="userstats">
        <h3>Stats</h3>
        <label className="m-2">Skill points: {freeSkillPoints}</label>

        <form className="userstats--form">
          <div className="userstats--stats">
            <label>Strength: {strength}</label>
            <label>Dexterity: {dexterity}</label>
            <label>Vitality: {vitality}</label>
            <label>Intelligence: {intelligence}</label>
            <label>Luck: {luck}</label>
          </div>

          {!showAddStat && (
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
                    max={freeSkillPoints}
                    pattern="^[0-9]+"
                  />
                  <img
                    onClick={handleClickAddSkill}
                    src={require("../img/utilities/addStats.webp")}
                  />
                </div>
              ))}
            </div>
          )}
        </form>

        <div className="userstats--info">
          <label>Defense: {defense}</label>
          <label>Evasion: {evasion}</label>
          <label>
            Critical Chance: {Math.round(criticalChance * 10) / 10}%
          </label>
          <label>
            Min/Max DMG: {minDmg}/{maxDmg}
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
