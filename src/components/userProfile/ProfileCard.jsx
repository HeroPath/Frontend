import React from "react";
import "../styles/styles.css";
import UserCard from "./UserCard";
import UserStats from "./UserStats";

const ProfileCard = ({ profile }) => {
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

export default ProfileCard;
