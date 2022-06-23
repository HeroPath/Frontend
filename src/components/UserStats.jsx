import React from "react";
import "./styles/styles.css";

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
  return (
    <section className="secondSection">
      <div className="secondSection--title">
        <h3>Stats</h3>
      </div>
      <div className="secondSection--form">
        <label>Skill points: {freeSkillPoints}</label>
        <label>Strength (STR): {strength}</label>
        <label>Dexterity (DEX): {dexterity}</label>
        <label>Vitality (INT): {vitality}</label>
        <label>Intelligence: {intelligence}</label>
        <label>Critical Chance: {luck}%</label>
        <label>
          Min/Max DMG: {minDmg}/{maxDmg}
        </label>
        <div>
          <button>Add stats</button>
        </div>
      </div>
    </section>
  );
};

export default UserStats;
