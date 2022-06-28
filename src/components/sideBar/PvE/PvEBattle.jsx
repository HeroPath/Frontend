import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";
import UserCard from "../../userProfile/UserCard";
import { Table } from "react-bootstrap";
import NpcCard from "./NpcCard";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

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

  const data = {
    columns: [
      {
        label: "Round",
        field: "id",
        sort: "asc",
      },
      {
        label: "User life",
        field: "userlife",
        sort: "asc",
      },
      {
        label: "User Damage",
        field: "userdamage",
        sort: "asc",
      },
      {
        label: "Npc life",
        field: "npclife",
        sort: "asc",
      },
      {
        label: "Npc Damage",
        field: "npcdamage",
        sort: "asc",
      },
    ],
  };

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
        {/* <MDBTable scrollY small bordered>
          <MDBTableHead columns={data.columns} />
          <MDBTableBody rows={battleData} />
        </MDBTable> */}

        <div className="history--box">
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
        </div>

        {/* <Table striped bordered hover>
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
        </Table> */}
        <a href="/profile" className="button--links links m-3 pe-5 ps-5">
          Profile
        </a>
      </div>
    </div>
  );
};

export default PvEBattle;
