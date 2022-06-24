import React from "react";
import "../styles/styles.css";
import UserStats from "./UserStats";

const UserCard = ({ profile }) => {
  const [showInventory, setshowInventory] = React.useState(false);
  const [showStats, setshowStats] = React.useState(false);

  return (
    <div>
      <section className="userCard">
        {showInventory && (
          <div style={{ border: "2px solid", marginLeft: "30px" }}>
            INVENTARIO
          </div>
        )}
        <button
          className="userCard--arrow userCard--arrow__left"
          onClick={() => {
            setshowInventory(showInventory ? false : true);
          }}
        >
          🢀
        </button>
        <div className="userCard--card">
          <h4 className="p-1">{profile.username}</h4>
          {profile.aclass && (
            <img
              src={require("../img/class/" + profile.aclass.name + ".jpg")}
              width="250px"
              height="315px"
              alt=""
            />
          )}

          <label>
            Hp: {profile.hp}/{profile.maxHp}
          </label>
          <label>
            Exp: {profile.experience}/{profile.experienceToNextLevel}
          </label>
          <label>Level: {profile.level}</label>
          <label>Class: {profile.aclassName}</label>
        </div>
        <button
          className="userCard--arrow userCard--arrow__right"
          onClick={() => {
            setshowStats(showStats ? false : true);
          }}
        >
          🢂
        </button>
        {showStats && (
          <UserStats
            key={profile.username}
            freeSkillPoints={profile.freeSkillPoints}
            strength={profile.strength}
            dexterity={profile.dexterity}
            vitality={profile.vitality}
            intelligence={profile.intelligence}
            luck={profile.luck}
            minDmg={profile.minDmg}
            maxDmg={profile.maxDmg}
          />
        )}
      </section>
    </div>
  );
};

export default UserCard;
