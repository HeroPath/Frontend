import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Table } from "react-bootstrap";

const Quests = () => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

  let questNumber = 1;
  let acceptedQuestNumber = 1;

  const [quests, setQuests] = React.useState([]);
  const [acceptedQuests, setAcceptedQuests] = React.useState([]);

  async function handleQuests() {
    await axios
      .get("http://localhost:8000/api/v1/quests", { headers })
      .then(async (response) => {
        if (response.status === 200) {
          setQuests(response.data);
        }
      });
  }

  async function handleQuestAccepted() {
    await axios
      .get("http://localhost:8000/api/v1/users/profile", { headers })
      .then(async (response) => {
        if (response.status === 200) {
          setAcceptedQuests(response.data.quests);
        }
      });
  }

  useEffect(() => {
    handleQuests();
    handleQuestAccepted();
  }, []);

  return (
    <div className="ranking">
      <h1>Quests Acepted</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Name Npc Kill</th>
            <th>Amount Npc Kill</th>
            <th>Give Exp</th>
            <th>Give Gold</th>
          </tr>
        </thead>
        {acceptedQuests.length === 0 && (
          <tbody key="none">
            <tr>
              <td>none</td>
              <td>none</td>
              <td>none</td>
              <td>none</td>
              <td>none</td>
              <td>none</td>
              <td>none</td>
            </tr>
          </tbody>
        )}
        {acceptedQuests?.map((acceptedQuest) => (
          <tbody key={acceptedQuest.name}>
            <tr>
              <td>{acceptedQuestNumber++}</td>
              <td>{acceptedQuest.name}</td>
              <td>{acceptedQuest.description}</td>
              <td>{acceptedQuest.nameNpcKill}</td>
              <td>{acceptedQuest.npcKillAmount}</td>
              <td>{acceptedQuest.giveExp}</td>
              <td>{acceptedQuest.giveGold}</td>
            </tr>
          </tbody>
        ))}
      </Table>
      
      <h1>Quests</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Name Npc Kill</th>
            <th>Amount Npc Kill</th>
            <th>Give Exp</th>
            <th>Give Gold</th>
          </tr>
        </thead>
        {quests?.map((quest) => (
          <tbody key={quest.name}>
            <tr>
              <td>{questNumber++}</td>
              <td>{quest.name}</td>
              <td>{quest.description}</td>
              <td>{quest.nameNpcKill}</td>
              <td>{quest.npcKillAmount}</td>
              <td>{quest.giveExp}</td>
              <td>{quest.giveGold}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default Quests;
