import React, { useEffect, useState } from "react";
import "../../styles/styles.css";
import { Table } from "react-bootstrap";
import Pagination from "../Pagination";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { headers } from "../../../functions/utilities";
import { get, post } from "../../../functions/requestsApi";

const Ranking = () => {
  let guildsCounter = 1;

  const [ranking, setRanking] = useState([]);
  const [guilds, setGuilds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  async function getRankingUsers() {
    const responseRanking = await get(
      `/api/v1/users/ranking?page=${currentPage}`,
      headers
    );
    if (responseRanking.status === 200) setRanking(responseRanking.data);
  }

  async function getRankingGuilds() {
    const responseGuilds = await get("/api/v1/guilds", headers);
    if (responseGuilds.status === 200) setGuilds(responseGuilds.data);
  }

  async function handleGuildRequest(data) {
    const response = await post("/api/v1/guilds/request", data, headers);
    if (response.status === 200) window.location.href = "/profile";
  }

  useEffect(() => {
    getRankingUsers();
  }, [currentPage]);

  useEffect(() => {
    getRankingGuilds();
  }, []);
  

  return (
    <div className="ranking">
      <div className="ranking--tableUsers">
        <h1>Ranking Users</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Guild</th>
              <th>Class</th>
              <th>Level</th>
              <th>Title</th>
              <th>Title Pts</th>
              <th>Strength</th>
              <th>Dexterity</th>
              <th>Vitality</th>
              <th>Intelligence</th>
              <th>Luck</th>
              <th>PvP Win</th>
              <th>PvP Loss</th>
            </tr>
          </thead>
          {ranking?.map((users) => (
            <tbody key={users.username}>
              <tr
                style={
                  users.rankPosition === 1
                    ? { backgroundColor: "#FFC300", fontSize: "22px" }
                    : users.rankPosition === 2
                    ? { backgroundColor: "#CDFD75", fontSize: "20px" }
                    : users.rankPosition === 3
                    ? { backgroundColor: "#DAF7A6", fontSize: "18px" }
                    : { backgroundColor: "#DEDEDE" }
                }
              >
                <td>{users.rankPosition}</td>
                <td>{users.username}</td>
                {users.guildName ? <td>{users.guildName}</td> : <td>---</td>}
                {users.aclassName && <td>{users.aclassName}</td>}
                <td>{users.level}</td>
                <td>{users.titleName}</td>
                <td>{users.titlePoints}</td>
                <td>{users.strength}</td>
                <td>{users.dexterity}</td>
                <td>{users.vitality}</td>
                <td>{users.intelligence}</td>
                <td>{users.luck}</td>
                <td>{users.pvpWins}</td>
                <td>{users.pvpLosses}</td>
              </tr>
            </tbody>
          ))}
        </Table>
        <Pagination
          totalPages={5}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      {guilds.length >= 1 && (
        <div>
          <h1>Ranking Guilds</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>TAG</th>
                <th>Description</th>
                <th>Title Points</th>
                <th>Leader</th>
                <th>Sub Leader</th>
                <th>Members</th>
                <th>Actions</th>
              </tr>
            </thead>
            {guilds?.map((guild) => (
              <tbody key={guild.name}>
                <tr
                  style={
                    guildsCounter === 1
                      ? { backgroundColor: "#FFC300", fontSize: "22px" }
                      : guildsCounter === 2
                      ? { backgroundColor: "#CDFD75", fontSize: "20px" }
                      : guildsCounter === 3 && {
                          backgroundColor: "#DAF7A6",
                          fontSize: "18px",
                        }
                  }
                >
                  <td>{guildsCounter++}</td>
                  <td>{guild.name}</td>
                  <td>{guild.tag}</td>
                  <td>{guild.description}</td>
                  <td>{guild.titlePoints}</td>
                  <td>{guild.leader}</td>
                  {guild.subLeader !== "" ? (
                    <td>{guild.subLeader}</td>
                  ) : (
                    <td>---</td>
                  )}
                  <td>
                    {guild.memberAmount} / {guild.maxMembers}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        handleGuildRequest({ name: guild.name });
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
      )}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Ranking;
