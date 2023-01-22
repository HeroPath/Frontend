import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Table } from "react-bootstrap";
import env from "react-dotenv";

const Guild = () => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

  const [userGuild, setUserGuild] = React.useState({});
  let memberCounter = 1;

  async function handleDataCheckUserInGuild() {
    await axios
      .get(env.API_URL + "/api/v1/guilds/in-guild", { headers })
      .then(async (response) => {
        if (response.status === 200) {
          console.log(response.data);
          if (response.data.userInGuild) setUserGuild(response.data);
        }
      });
  }

  useEffect(() => {
    handleDataCheckUserInGuild();
  }, []);

  return (
    <div className="ranking">
    
      {userGuild.userInGuild ? (
        <div>
          <h1>{userGuild.name} - {userGuild.tag}</h1>
          <h3>Description: {userGuild.description}</h3>
          <h3>Leader: {userGuild.leader}</h3>
          <h3>Sub-Leader: {userGuild.subLeader}</h3>
          <h3>Members Amount: {userGuild.memberAmount}</h3>
          <h1>Members</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Class</th>
                <th>Level</th>
                <th>Title</th>
                <th>Title Points</th>
              </tr>
            </thead>
            <tbody>
              {userGuild.members.map((member) => (
                <tr>
                  <td>{memberCounter++}</td>
                  <td>{member.username}</td>
                  <td>{member.className}</td>
                  <td>{member.level}</td>
                  <td>{member.titleName}</td>
                  <td>{member.titlePoints}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <h1>You are not in a guild</h1>
      )}
    </div>
  );
};

export default Guild;
