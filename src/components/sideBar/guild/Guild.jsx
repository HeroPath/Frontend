import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Table } from "react-bootstrap";
import env from "react-dotenv";
import CreateNewGuild from "./CreateNewGuild";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Guild = () => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

  const [userGuild, setUserGuild] = React.useState({});
  let memberCounter = 1;
  let memberRequestCounter = 1;

  async function handleDataCheckUserInGuild() {
    await axios
      .get(env.API_URL + "/api/v1/guilds/in-guild", { headers })
      .then(async (response) => {
        if (response.status === 200) {
          console.log(response.data);
          if (response.data.userInGuild) setUserGuild(response.data);
        }
      })
      .catch((err) => {
        if (err.request.status !== 0) {
          notify(err.response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, [2500]);
        }
      });
  }

  useEffect(() => {
    handleDataCheckUserInGuild();
  }, []);

  const notify = (alert) => {
    toast.error(alert, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="ranking">
      <div>
        {userGuild.userInGuild ? (
          <div>
            <h1>
              {userGuild.name} - {userGuild.tag}
            </h1>
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
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {userGuild.members.map((member) => (
                  <tr key={member.username}>
                    <td>{memberCounter++}</td>
                    <td>{member.username}</td>
                    <td>{member.className}</td>
                    <td>{member.level}</td>
                    <td>{member.titleName}</td>
                    <td>{member.titlePoints}</td>

                    {userGuild.username === userGuild.leader ? (
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          size="lg"
                          onClick={() => {
                            axios
                              .get(
                                env.API_URL +
                                  "/api/v1/guilds/remove/" +
                                  member.username,
                                { headers }
                              )
                              .then((response) => {
                                if (response.status === 200)
                                  window.location.reload();
                              })
                              .catch((err) => {
                                if (err.request.status !== 0) {
                                  notify(err.response.data.message);
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, [2500]);
                                }
                              });
                          }}
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          size="lg"
                          onClick={() => {
                            axios
                              .get(
                                env.API_URL +
                                  "/api/v1/guilds/make-subleader/" +
                                  member.username,
                                { headers }
                              )
                              .then((response) => {
                                if (response.status === 200)
                                  window.location.reload();
                              })
                              .catch((err) => {
                                if (err.request.status !== 0) {
                                  notify(err.response.data.message);
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, [2500]);
                                }
                              });
                          }}
                        >
                          Make Sub-Leader
                        </button>
                      </td>
                    ) : (
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          size="lg"
                          onClick={() => {
                            axios
                              .get(
                                env.API_URL +
                                  "/api/v1/guilds/remove/" +
                                  member.username,
                                { headers }
                              )
                              .then((response) => {
                                if (response.status === 200)
                                  window.location.reload();
                              })
                              .catch((err) => {
                                if (err.request.status !== 0) {
                                  notify(err.response.data.message);
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, [2500]);
                                }
                              });
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>

            <Table striped bordered hover>
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
                    <td>{memberRequest.className}</td>
                    <td>{memberRequest.level}</td>
                    <td>{memberRequest.titleName}</td>
                    <td>{memberRequest.titlePoints}</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        size="lg"
                        onClick={() => {
                          axios
                            .get(
                              env.API_URL +
                                "/api/v1/guilds/accept/" +
                                memberRequest.username,
                              { headers }
                            )
                            .then((response) => {
                              if (response.status === 200)
                                window.location.reload();
                            })
                            .catch((err) => {
                              if (err.request.status !== 0) {
                                notify(err.response.data.message);
                                setTimeout(() => {
                                  window.location.reload();
                                }, [2500]);
                              }
                            });
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
