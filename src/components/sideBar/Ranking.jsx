import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import "../styles/styles.css";
import { Table } from "react-bootstrap";

const Ranking = () => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

  let i = 1;

  const [ranking, setRanking] = React.useState([]);

  async function handleData() {
    await axios
      .get("http://localhost:8000/api/v1/users/ranking", { headers })
      .then(async (response) => {
        if (response.status === 200) {
          setRanking(response.data);
          console.log(response.data);
        }
      });
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="ranking">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Class</th>
            <th>Level</th>
            <th>Title</th>
            <th>Title Points</th>
            <th>Strength</th>
            <th>Dexterity</th>
            <th>Vitality</th>
            <th>Intelligence</th>
            <th>Luck</th>
            <th>Critical Chance</th>
            <th>Defense</th>
            <th>Evasion</th>
            <th>PvP Win</th>
            <th>PvP Loss</th>
          </tr>
        </thead>
        {ranking?.map((users) => (
          <tbody key={users.username}>
            <tr>
              <td>{i++}</td>
              <td>{users.username}</td>
              {users.aclass && <td>{users.aclass.name}</td>}
              <td>{users.level}</td>
              <td>{users.title.name}</td>
              <td>{users.titlePoints}</td>
              <td>{users.strength}</td>
              <td>{users.dexterity}</td>
              <td>{users.vitality}</td>
              <td>{users.intelligence}</td>
              <td>{users.luck}</td>
              <td>{users.criticalChance}%</td>
              <td>{users.defense}</td>
              <td>{users.evasion}%</td>
              <td>{users.pvpWins}</td>
              <td>{users.pvpLosses}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default Ranking;
