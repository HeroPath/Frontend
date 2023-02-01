import React from "react";
import "../styles/styles.css";
import UserCard from "./UserCard";
import UserStats from "./UserStats";
import UserInventory from "./UserInventory";

const ProfileCard = ({ profile }) => {
  const {
    inventory,
    equipment,
    aclass,
    level,
    username,
    hp,
    maxHp,
    experience,
    experienceToNextLevel,
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
  } = profile;
  return (
    <div id="profileCard">
      <section className="userCard">
        {inventory && equipment && (
          <UserInventory
            inventory={inventory}
            equipment={equipment}
            aclass={aclass}
            level={level}
          />
        )}
        {aclass && maxDmg && (
          <UserCard
            username={username}
            aclass={aclass}
            hp={hp}
            maxHp={maxHp}
            experience={experience}
            experienceToNextLevel={experienceToNextLevel}
            level={level}
          />
        )}
        {strength &&
          dexterity &&
          vitality &&
          intelligence &&
          luck &&
          freeSkillPoints !== undefined &&
          minDmg &&
          maxDmg &&
          defense &&
          evasion &&
          criticalChance && (
            <UserStats
              freeSkillPoints={freeSkillPoints}
              strength={strength}
              dexterity={dexterity}
              vitality={vitality}
              intelligence={intelligence}
              luck={luck}
              minDmg={minDmg}
              maxDmg={maxDmg}
              npcKills={npcKills}
              defense={defense}
              evasion={evasion}
              criticalChance={criticalChance}
            />
          )}
      </section>
    </div>
  );
};

export default ProfileCard;
