import React, { useState } from "react";
import "../styles/styles.css";
import UserCard from "./UserCard";
import UserStats from "./UserStats";
import UserInventory from "./UserInventory";

function ProfileCard({ profile }) {
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

  const [userStats, setUserStats] = useState(undefined);
  const [userCard, setUserCard] = useState(undefined);

  const updateStats = (newStats) => {
    setUserStats({
      newStrength: newStats.strength,
      newDexterity: newStats.dexterity,
      newVitality: newStats.vitality,
      newIntelligence: newStats.intelligence,
      newLuck: newStats.luck,
      newMinDmg: newStats.minDmg,
      newMaxDmg: newStats.maxDmg,
      newDefense: newStats.defense,
      newEvasion: newStats.evasion,
      newCriticalChance: newStats.criticalChance,
    });
    setUserCard({
      newHp: newStats.hp,
      newMaxHp: newStats.maxHp,
    });
  };

  const statVitality = (data) => {
    setUserCard({
      newHp: data.hp,
      newMaxHp: data.maxHp,
    });
  };

  return (
    <div id="profileCard">
      <section className="userCard">
        {inventory && equipment && (
          <UserInventory
            inventory={inventory}
            equipment={equipment}
            aclass={aclass}
            level={level}
            updateStats={updateStats}
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
            userCard={userCard}
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
              statVitality={statVitality}
              userStats={userStats}
            />
          )}
      </section>
    </div>
  );
}

export default ProfileCard;
