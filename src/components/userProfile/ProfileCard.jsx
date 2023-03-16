import React, { useState } from "react";
import UserCard from "./UserCard";
import UserStats from "./UserStats";
import UserInventory from "./UserInventory";

function ProfileCard({ p }) {
  const [userNewData, setUserNewData] = useState({});

  const updateStats = (newStats) => setUserNewData(newStats);

  const hasInventoryAndEquipment = p.inventory && p.equipment;
  const hasAclassAndMaxDmg = p.aclass && p.maxDmg;
  const hasAllStats =
    p.strength &&
    p.dexterity &&
    p.vitality &&
    p.intelligence &&
    p.luck &&
    p.freeSkillPoints !== undefined &&
    p.minDmg &&
    p.maxDmg &&
    p.defense &&
    p.evasion &&
    p.criticalChance;

  return (
    <div id="profileCard">
      <section className="userCard">
        {hasInventoryAndEquipment && (
          <UserInventory
            inventory={p.inventory}
            equipment={p.equipment}
            aclass={p.aclass}
            level={p.level}
            updateStats={updateStats}
          />
        )}
        {hasAclassAndMaxDmg && (
          <UserCard
            username={p.username}
            aclass={p.aclass}
            hp={p.hp}
            maxHp={p.maxHp}
            experience={p.experience}
            experienceToNextLevel={p.experienceToNextLevel}
            level={p.level}
            userNewData={userNewData}
          />
        )}
        {hasAllStats && (
          <UserStats
            freeSkillPoints={p.freeSkillPoints}
            strength={p.strength}
            dexterity={p.dexterity}
            vitality={p.vitality}
            intelligence={p.intelligence}
            luck={p.luck}
            minDmg={p.minDmg}
            maxDmg={p.maxDmg}
            npcKills={p.npcKills}
            defense={p.defense}
            evasion={p.evasion}
            criticalChance={p.criticalChance}
            updateStats={updateStats}
            userNewData={userNewData}
          />
        )}
      </section>
    </div>
  );
}

export default ProfileCard;
