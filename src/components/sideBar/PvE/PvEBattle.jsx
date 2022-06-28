import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";
import UserCard from "../../userProfile/UserCard";
import NpcCard from "./NpcCard";
import { Table } from "react-bootstrap";

const PvEBattle = () => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

  const location = useLocation();

  const [profile, setProfile] = React.useState({});
  const [battleData, setBattleData] = React.useState([]);

  async function handleData() {
    await axios
      .get("https://ao-web.herokuapp.com/api/v1/users/profile", { headers })
      .then(async (response) => {
        if (response.status === 200) {
          response.data.username = response.data.username.replace(
            /(^\w{1})/g,
            (letter) => letter.toUpperCase()
          );
          setProfile(response.data);
        }
      });
  }

  useEffect(() => {
    handleData();
    setBattleData(location.state.battleData);
  }, []);

  const npcName = location.state.battleData.nameData.replace(
    /(^\w{1})/g,
    (letter) => letter.toUpperCase()
  );

  return (
    <div className="pvebattle">
      <div className="pvebattle--usercard">
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
      <div className="pvebattle--npccard">
        <NpcCard />
      </div>

      <div className="rounds--console">
        <div className="history-box">
          {battleData?.map((rounds) => (
            <ul key={rounds.round} className="round">
              <h6>Round: {rounds.round}</h6>
              <div>
                <li>
                  {profile.username} has attacked {npcName} for {rounds.userDmg}{" "}
                  damage. ({npcName} has {rounds.NpcLife} life)
                </li>
                <li>
                  {npcName} has attacked {profile.username} for {rounds.npcDmg}
                  damage. ({profile.username} has {rounds.userLife} life)
                </li>
              </div>
            </ul>
          ))}
        </div>

        {/* <div className="history--box--2">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Round</th>
                <th>User life</th>
                <th>User dmg</th>
                <th>Npc life</th>
                <th>Npc dmg</th>
              </tr>
            </thead>
            <tbody className="rounds">
              {battleData?.map((rounds) => (
                <tr key={rounds.round}>
                  <td>{rounds.round}</td>
                  <td>{rounds.userLife}</td>
                  <td>{rounds.userDmg}</td>
                  <td>{rounds.NpcLife}</td>
                  <td>{rounds.NpcDmg}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div> */}
        <a href="/profile" className="button--links links m-3 pe-5 ps-5">
          Profile
        </a>
      </div>
    </div>
  );
};

export default PvEBattle;
