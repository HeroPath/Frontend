import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import Navbar from "./Navbar";

import { get } from "../../functions/requestsApi";
import { headers } from "../../functions/utilities";

const Profile = () => {
  const [profile, setProfile] = useState({});

  async function getProfile() {
    const response = await get("/api/v1/users/profile", headers);
    if (response.status === 200) {
      console.log(response.data.inventory);
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
      <ProfileCard p={profile} />
    </div>
  );
};

export default Profile;
