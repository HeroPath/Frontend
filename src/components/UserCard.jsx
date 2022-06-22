import React from "react";
import war from "./class/war.jpg";
import "../components/styles/styles.css";

const UserCard = ({ profile }) => {
  const [showDetail, setShowDetail] = React.useState(false);

  return (
    <div className="profile">
      <section className="firstSection">
        <div className="firstSection--card">
          <label>{profile.username}</label>
          <img src={war} width="250px" height="315px" />
          <label>
            ☼{profile.gold} || ♦{profile.diamond}
          </label>
          <label>Level: {profile.level}</label>
          <label>Class: {profile.aclassName}</label>
          <label>Role: {profile.roleName}</label>
          <label>
            Hp: {profile.hp}/{profile.maxHp}
          </label>
          <label>
            Exp: {profile.experience}/{profile.experienceToNextLevel}
          </label>
        </div>
        <button
          className="firstSection--arrow"
          onClick={() => {
            if (showDetail === false) {
              setShowDetail(true);
            } else {
              setShowDetail(false);
            }
          }}
        >
          ➤
        </button>
      </section>

      {showDetail && (
        <section className="secondSection">
          <div className="secondSection--title">
            <h3>Stats</h3>
          </div>
          <div className="secondSection--form">
            <label>Skill points: {profile.freeSkillPoints}</label>
            <label>Strength (STR): {profile.strength}</label>
            <label>Dexterity (DEX): {profile.dexterity}</label>
            <label>Vitality (INT): {profile.vitality}</label>
            <label>Intelligence: {profile.intelligence}</label>
            <label>Critical Chance: {profile.luck}%</label>
            <label>
              Min/Max DMG: {profile.minDmg}/{profile.maxDmg}
            </label>
            <div>
              <button>Add stats</button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default UserCard;
