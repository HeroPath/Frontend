"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/store/slice";

import Navbar from "../components/Navbar/Navbar";
import UserInventory from "./components/UserInventory/UserInventory";
import UserCard from "./components/UserCard/UserCard";
import UserStats from "./components/UserStats/UserStats";

const page = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.Slice.userData);

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  const [userNewData, setUserNewData] = useState(false);
  const updateStats = (newStats) => setUserNewData(newStats);

  return (
    <div className="profile">
      <Navbar gold={profile.gold} diamond={profile.diamond} pvePts={profile.pvePts} pvpPts={profile.pvpPts} />
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
              // sendFromProfile={sendFromProfile}
              userNewData={userNewData}
            />
          )}

          {profile.strength && <UserStats profile={profile} />}
        </section>
      </div>
    </div>
  );
};

export default page;
