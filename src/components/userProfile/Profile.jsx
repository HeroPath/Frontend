import { useState, useEffect } from "react";
import "./profile.css";
import Navbar from "./Navbar/Navbar";

import UserInventory from "./UserInventory/UserInventory";
import UserCard from "./UserCard/UserCard";
import UserStats from "./UserStats/UserStats";

import { get } from "../../functions/requestsApi";
import { headers } from "../../functions/utilities";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [userNewData, setUserNewData] = useState(false);
  const updateStats = (newStats) => setUserNewData(newStats);

  async function getProfile() {
    const response = await get("/api/v1/users/profile", headers);
    if (response.status === 200) {
      setProfile(response.data);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="profile">
      <Navbar
        gold={profile.gold}
        diamond={profile.diamond}
        role={profile.role}
        pvePts={profile.pvePts}
        pvpPts={profile.pvpPts}
      />
      <div id="profileCard">
        <section className="userCard">
          {profile.inventory && profile.equipment && (
            <UserInventory
              inventory={profile.inventory}
              equipment={profile.equipment}
              aclass={profile.aclass}
              level={profile.level}
              updateStats={updateStats}
            />
          )}
          {profile.aclass && (
            <UserCard
              username={profile.username}
              aclass={profile.aclass}
              hp={profile.hp}
              maxHp={profile.maxHp}
              experience={profile.experience}
              experienceToNextLevel={profile.experienceToNextLevel}
              level={profile.level}
              userNewData={userNewData}
            />
          )}

          {profile.strength &&
            profile.dexterity &&
            profile.vitality &&
            profile.intelligence &&
            profile.luck &&
            profile.freeSkillPoints !== undefined &&
            profile.minDmg &&
            profile.maxDmg &&
            profile.defense &&
            profile.evasion &&
            profile.criticalChance && (
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
                defense={profile.defense}
                evasion={profile.evasion}
                criticalChance={profile.criticalChance}
                updateStats={updateStats}
                userNewData={userNewData}
              />
            )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
