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

  let i = 1;

  const [guilds, setGuilds] = React.useState([]);

  async function handleData() {
    await axios
      .get(env.API_URL + "/api/v1/guilds/" + cookies.get("guildName"), {
        headers,
      })
      .then(async (response) => {
        if (response.status === 200) {
          console.log(response.data);
        }
      });

    await axios
      .get(env.API_URL + "/api/v1/guilds", { headers })
      .then(async (response) => {
        if (response.status === 200) {
          setGuilds(response.data);
          console.log(response.data);
        }
      });
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="ranking">
      <h1>Guilds</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>TAG</th>
            <th>Description</th>
            <th>Leader</th>
            <th>Sub Leader</th>
            <th>Members</th>
            <th>Actions</th>
          </tr>
        </thead>
        {guilds?.map((guild) => (
          <tbody key={guild.name}>
            <tr>
              <td>{i++}</td>
              <td>{guild.name}</td>
              <td>{guild.tag}</td>
              <td>{guild.description}</td>
              <td>{guild.leader}</td>
              <td>{guild.subLeader}</td>
              <td>{guild.members}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    axios
                      .post(
                        env.API_URL + "/api/v1/guilds/add",
                        { name: guild.name },
                        { headers }
                      )
                      .then((response) => {
                        if (response.status === 200) window.location.reload();
                      });
                  }}
                >
                  Apply
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default Guild;
