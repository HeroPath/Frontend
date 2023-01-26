import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Table } from "react-bootstrap";
import env from "react-dotenv";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Quests = () => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

  let nonAcceptedQuestsNumber = 1;
  let acceptedQuestNumber = 1;

  const [nonAcceptedQuests, setNonAcceptedQuests] = useState([]);
  const [acceptedQuests, setAcceptedQuests] = useState([]);

  useEffect(() => {
    axios
      .get(env.API_URL + "/api/v1/quests", { headers })
      .then((response) => {
        if (response.status === 200) {
          setAcceptedQuests(
            response.data.filter((quest) => quest.npcKillAmount !== undefined)
          );
          setNonAcceptedQuests(
            response.data.filter((quest) => quest.npcKillAmount === undefined)
          );
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
      {acceptedQuests.length >= 1 && (
        <div>
          <h1>Quests Acepted</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Npc Kill</th>
                <th>Npc Kills</th>
                <th>User Kills</th>
                <th>Exp</th>
                <th>Gold</th>
                <th>Diamonds</th>
                <th>Action</th>
              </tr>
            </thead>

            {acceptedQuests &&
              acceptedQuests?.length >= 1 &&
              acceptedQuests?.map((acceptedQuest, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{acceptedQuestNumber++}</td>
                    <td>{acceptedQuest.quest.name}</td>
                    <td>{acceptedQuest.quest.description}</td>
                    <td>{acceptedQuest.quest.nameNpcKill}</td>
                    <td>
                      {acceptedQuest.npcKillAmount} /{" "}
                      {acceptedQuest.quest.npcKillAmountNeeded}
                    </td>
                    <td>
                      {acceptedQuest.userKillAmount} /{" "}
                      {acceptedQuest.quest.userKillAmountNeeded}
                    </td>
                    <td>{acceptedQuest.quest.giveExp}</td>
                    <td>{acceptedQuest.quest.giveGold}</td>
                    <td>{acceptedQuest.quest.giveDiamonds}</td>
                    {acceptedQuest.npcKillAmount >=
                      acceptedQuest.quest.npcKillAmountNeeded &&
                    acceptedQuest.userKillAmount >=
                      acceptedQuest.quest.userKillAmountNeeded ? (
                      <td>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => {
                            axios
                              .post(
                                env.API_URL + "/api/v1/quests/complete",
                                { name: acceptedQuest.quest.name },
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
                          Complete
                        </button>
                      </td>
                    ) : (
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            axios
                              .post(
                                env.API_URL + "/api/v1/quests/cancel",
                                { name: acceptedQuest.quest.name },
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
                          Cancel
                        </button>
                      </td>
                    )}
                  </tr>
                </tbody>
              ))}
          </Table>
        </div>
      )}
      {nonAcceptedQuests.length >= 1 && (
        <div>
          <h1>Quests</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Npc Kill</th>
                <th>Amount NPC</th>
                <th>Amount USER</th>
                <th>Exp</th>
                <th>Gold</th>
                <th>Diamonds</th>
                <th>Action</th>
              </tr>
            </thead>
            {nonAcceptedQuests?.map((nonAcceptedQuest, index) => (
              <tbody key={index}>
                <tr>
                  <td>{nonAcceptedQuestsNumber++}</td>
                  <td>{nonAcceptedQuest.quest.name}</td>
                  <td>{nonAcceptedQuest.quest.description}</td>
                  <td>{nonAcceptedQuest.quest.nameNpcKill}</td>
                  <td>{nonAcceptedQuest.quest.npcKillAmountNeeded}</td>
                  <td>{nonAcceptedQuest.quest.userKillAmountNeeded}</td>
                  <td>{nonAcceptedQuest.quest.giveExp}</td>
                  <td>{nonAcceptedQuest.quest.giveGold}</td>
                  <td>{nonAcceptedQuest.quest.giveDiamonds}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        axios
                          .post(
                            env.API_URL + "/api/v1/quests/accept",
                            { name: nonAcceptedQuest.quest.name },
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

export default Quests;
