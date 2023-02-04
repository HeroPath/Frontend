import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import CreateNewGuild from "./CreateNewGuild";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { headers } from "../../../functions/utilities";
import { get } from "../../../functions/requestsApi";

const Guild = () => {
  const [userGuild, setUserGuild] = useState({});

  let memberCounter = 1;
  let memberRequestCounter = 1;

  async function checkUserInGuild() {
    const response = await get("/api/v1/guilds/in-guild", headers);
    if (response.status === 200) {
      if (response.data.userInGuild) {
        console.log(response.data);
        setUserGuild(response.data);
      }
    }
  }

  async function handleRemovePromoteOrAcceptUserGuild(
    urlAction,
    memberUsername
  ) {
    const response = await get(
      "/api/v1/guilds/" + urlAction + memberUsername,
      headers
    );
    if (response.status === 200) window.location.reload();
  }

  useEffect(() => {
    checkUserInGuild();
  }, []);

  return (
    <div className="guild">
      <div>
        {userGuild.userInGuild ? (
          <div>
            <div>
              <h1>Guild Stats</h1>
              <Table striped bordered hover className="guild--stats">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Tag</th>
                    <th>Description</th>
                    <th>Leader</th>
                    <th>Sub Leader</th>
                    <th>Title Points</th>
                    <th>Members</th>
                    <th>Level</th>
                    <th>Diamonds</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{userGuild.name}</td>
                    <td>{userGuild.tag}</td>
                    <td>{userGuild.description}</td>
                    <td style={{ backgroundColor: "#CFD601" }}>
                      {userGuild.leader}
                    </td>
                    {userGuild.subLeader !== "" ? (
                      <td style={{ backgroundColor: "#8CD601" }}>
                        {userGuild.subLeader}
                      </td>
                    ) : (
                      <td style={{ backgroundColor: "#fff" }}>---</td>
                    )}
                    <td>{userGuild.titlePoints}</td>
                    <td>
                      {userGuild.memberAmount} / {userGuild.maxMembers}
                    </td>
                    <td>{userGuild.level}</td>
                    <td>{userGuild.diamonds}</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <div>
              <h1>Members</h1>
              <Table striped bordered hover className="guild--members">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Class</th>
                    <th>Level</th>
                    <th>Title</th>
                    <th>Title Points</th>
                    {(userGuild.username === userGuild.subLeader ||
                      userGuild.username === userGuild.leader) && (
                      <th>Actions</th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {userGuild.members.map((member) => (
                    <tr
                      key={member.username}
                      style={
                        userGuild.leader === member.username
                          ? { backgroundColor: "#CFD601", fontSize: "22px" }
                          : userGuild.subLeader === member.username
                          ? { backgroundColor: "#8CD601", fontSize: "19px" }
                          : { backgroundColor: "white" }
                      }
                    >
                      <td>{memberCounter++}</td>
                      <td>{member.username}</td>
                      <td>{member.aclass}</td>
                      <td>{member.level}</td>
                      <td>{member.titleName}</td>
                      <td>{member.titlePoints}</td>

                      {(userGuild.username === userGuild.subLeader ||
                        userGuild.username === userGuild.leader) && (
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                              handleRemovePromoteOrAcceptUserGuild(
                                "remove/",
                                member.username
                              );
                            }}
                          >
                            Remove
                          </button>
                          {userGuild.username === userGuild.leader && (
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() => {
                                handleRemovePromoteOrAcceptUserGuild(
                                  "make-subleader/",
                                  member.username
                                );
                              }}
                            >
                              Make Sub-Leader
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {userGuild.requests.length > 0 &&
              userGuild.username === userGuild.leader && (
                <div>
                  <h1>Requests</h1>
                  <Table striped bordered hover className="guild--requests">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Class</th>
                        <th>Level</th>
                        <th>Title</th>
                        <th>Title Points</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {userGuild.requests.map((memberRequest) => (
                        <tr key={memberRequest.username}>
                          <td>{memberRequestCounter++}</td>
                          <td>{memberRequest.username}</td>
                          <td>{memberRequest.aclass}</td>
                          <td>{memberRequest.level}</td>
                          <td>{memberRequest.titleName}</td>
                          <td>{memberRequest.titlePoints}</td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              size="lg"
                              onClick={() => {
                                handleRemovePromoteOrAcceptUserGuild(
                                  "accept/",
                                  memberRequest.username
                                );
                              }}
                            >
                              Accept
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CreateNewGuild />
          </div>
        )}
      </div>

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

export default Guild;
