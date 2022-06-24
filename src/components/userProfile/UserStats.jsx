import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "../styles/styles.css";

const UserStats = ({
  freeSkillPoints,
  strength,
  dexterity,
  vitality,
  intelligence,
  luck,
  minDmg,
  maxDmg,
}) => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

  const [clickAddSkill, setClickAddSkill] = React.useState({
    stat: "",
    amount: 0,
  });

  async function handleClickAddSkill() {
    await axios
      .post(
        " https://ao-web.herokuapp.com/api/v1/users/add-skill-points",
        { skillPointName: clickAddSkill.stat, amount: clickAddSkill.amount },
        { headers }
      )
      .then(async (response) => {
        if (response.status === 200) {
        }
      });
  }

  function handleChangeAmount(e) {
    const newValues = {
      stat: "strength",
      amount: e.target.value,
    };

    setClickAddSkill(newValues);
  }

  const [showAddStat, setShowAddStat] = React.useState(false);

  function showAddPoints() {
    if (freeSkillPoints > 0) {
      setShowAddStat(showAddStat ? false : true);
    }
  }

  useEffect(() => {
    showAddPoints();
  }, []);

  return (
    <section className="secondSection">
      <h3 className="secondSection--title">Stats</h3>
      <label className="m-2">Skill points: {freeSkillPoints}</label>

      <form className="secondSection--form">
        <div className="secondSection--stats">
          <label>Strength (STR): {strength}</label>
          <label>Dexterity (DEX): {dexterity}</label>
          <label>Vitality (INT): {vitality}</label>
          <label>Intelligence: {intelligence}</label>
          <label>Critical Chance: {luck}%</label>
        </div>

        {showAddStat && (
          <div className="secondSection--add">
            <input
              type="number"
              className="form-control"
              onChange={handleChangeAmount}
            />
            <button className="btn btn-danger" onClick={handleClickAddSkill}>
              +
            </button>
            <input type="number" className="form-control" />
            <button className="btn btn-danger">+</button>
            <input type="number" className="form-control" />
            <button className="btn btn-danger">+</button>
            <input type="number" className="form-control" />
            <button className="btn btn-danger">+</button>
            <input type="number" className="form-control" />
            <button className="btn btn-danger">+</button>
          </div>
        )}
      </form>

      <label style={{ display: "block" }}>
        Min/Max DMG: {minDmg}/{maxDmg}
      </label>
    </section>
  );
};

export default UserStats;
