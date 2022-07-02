import React from "react";
import "../styles/styles.css";
import UserCard from "./UserCard";
import UserStats from "./UserStats";
import UserInventory from "./UserInventory";

const ProfileCard = ({ profile }) => {
  return (
    <div id="profileCard">
      <section className="userCard">
        <UserInventory
          inventory={profile.inventory}
          equipment={profile.equipment}
        />

        {profile.aclass && (
          <UserCard
            username={profile.username}
            aclass={profile.aclass}
            hp={profile.hp}
            maxHp={profile.maxHp}
            experience={profile.experience}
            experienceToNextLevel={profile.experienceToNextLevel}
            level={profile.level}
          />
        )}
        <UserStats
          freeSkillPoints={profile.freeSkillPoints}
          strength={profile.strength}
          dexterity={profile.dexterity}
          vitality={profile.vitality}
          intelligence={profile.intelligence}
          luck={profile.luck}
          minDmg={profile.minDmg}
          maxDmg={profile.maxDmg}
          npcKills={profile.npcKills}
        />
      </section>
    </div>
  );
};

export default ProfileCard;
