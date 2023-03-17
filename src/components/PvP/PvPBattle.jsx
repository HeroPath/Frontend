import { useEffect, useState } from "react";
import { headers } from "../../functions/utilities";
import { get } from "../../functions/requestsApi";
import UserCard from "../userProfile/UserCard/UserCard";
import HistoryConsole from "../Battle/HistoryConsole";
// import { sounds } from "../../../functions/utilities";

const PvPBattle = () => {
  const [profile, setProfile] = useState({});
  // const [finishBattle, setFinishBattle] = useState(false);
  // const [winnerBattle, setWinnerBattle] = useState({});
  // const [battleData, setBattleData] = useState([]);

  async function getPvpBattle() {
    const response = await get("/api/v1/users/profile", headers);
    if (response.status === 200) {
      setProfile(response.data);
    }
  }

  useEffect(() => {
    getPvpBattle();
  }, []);

  return (
    <div className="battle">
      <div className="battle--usercard">
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
      </div>

      <HistoryConsole />
    </div>
  );
};

export default PvPBattle;
