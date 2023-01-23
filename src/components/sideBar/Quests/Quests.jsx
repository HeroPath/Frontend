import React, { useEffect } from "react";
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

  let questNumber = 1;
  let acceptedQuestNumber = 1;

  const [quests, setQuests] = React.useState([]);
  const [acceptedQuests, setAcceptedQuests] = React.useState([]);

  async function handleQuests() {
    await axios
      .get(env.API_URL + "/api/v1/quests", { headers })
      .then(async (response) => {
        if (response.status === 200) {
          setQuests(response.data);
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

  async function handleQuestAccepted() {
    await axios
      .get(env.API_URL + "/api/v1/users/profile", { headers })
      .then(async (response) => {
        if (response.status === 200) {
          setAcceptedQuests(response.data.quests);
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
    handleQuests();
    handleQuestAccepted();
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

            {acceptedQuests?.map((acceptedQuest) => (
              <tbody key={acceptedQuest.name}>
                <tr>
                  <td>{acceptedQuestNumber++}</td>
                  <td>{acceptedQuest.name}</td>
                  <td>{acceptedQuest.description}</td>
                  <td>{acceptedQuest.nameNpcKill}</td>
                  <td>
                    {acceptedQuest.npcKillAmount} /{" "}
                    {acceptedQuest.npcKillAmountNeeded}
                  </td>
                  <td>
                    {acceptedQuest.userKillAmount} /{" "}
                    {acceptedQuest.userKillAmountNeeded}
                  </td>
                  <td>{acceptedQuest.giveExp}</td>
                  <td>{acceptedQuest.giveGold}</td>
                  <td>{acceptedQuest.giveDiamonds}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        axios
                          .post(
                            env.API_URL + "/api/v1/quests/cancel",
                            { name: acceptedQuest.name },
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
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      )}

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
        {quests?.map((quest) => (
          <tbody key={quest.name}>
            <tr>
              <td>{questNumber++}</td>
              <td>{quest.name}</td>
              <td>{quest.description}</td>
              <td>{quest.nameNpcKill}</td>
              <td>{quest.npcKillAmountNeeded}</td>
              <td>{quest.userKillAmountNeeded}</td>
              <td>{quest.giveExp}</td>
              <td>{quest.giveGold}</td>
              <td>{quest.giveDiamonds}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    axios
                      .post(
                        env.API_URL + "/api/v1/quests/accept",
                        { name: quest.name },
                        { headers }
                      )
                      .then((response) => {
                        if (response.status === 200) window.location.reload();
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
