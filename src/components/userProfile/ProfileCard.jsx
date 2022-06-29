import React from "react";
import "../styles/styles.css";
import UserCard from "./UserCard";
import UserStats from "./UserStats";
import UserInventory from "./UserInventory";

const ProfileCard = ({ profile }) => {
  const [showInventory, setshowInventory] = React.useState(true);
  const [showStats, setshowStats] = React.useState(false);

  return (
    <div>
      <section className="userCard">
        {showInventory && <UserInventory />}
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
            key={profile.aclass}
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
