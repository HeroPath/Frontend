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
  let sendFromProfile = true;
  const [userNewData, setUserNewData] = useState(false);
  const updateStats = (newStats) => setUserNewData(newStats);

  async function getProfile() {
    const response = await get("/api/v1/users/profile", headers);
    if (response.status === 200) {
      setProfile(response.data);
      console.log(response.data);
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
          {profile.inventory && (
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
              guildName={profile.guildName}
              titleName={profile.titleName}
              titlePoints={profile.titlePoints}
              titlePointsToNextLevel={profile.titlePointsToNextLevel}
              sendFromProfile={sendFromProfile}
              userNewData={userNewData}
            />
          )}

          {profile.strength && <UserStats profile={profile} updateStats={updateStats} userNewData={userNewData} />}
        </section>
      </div>
    </div>
  );
};

export default Profile;
