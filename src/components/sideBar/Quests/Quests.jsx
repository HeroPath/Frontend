import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Pagination from "../Pagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { headers, notifySuccess } from "../../../functions/utilities";
import { get, post } from "../../../functions/requestsApi";

const Quests = () => {
  let nonAcceptedQuestsNumber = 1;
  let acceptedQuestNumber = 1;
  const [nonAcceptedQuests, setNonAcceptedQuests] = useState([]);
  const [acceptedQuests, setAcceptedQuests] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  async function handleQuests(actionUrl, values) {
    const response = await post("/api/v1/quests/" + actionUrl, values, headers);
    if (response.status === 200) {
      if (nonAcceptedQuests.length <= 1) getQuests(currentPage - 1);
      else getQuests(currentPage);
    }

    if (response.status === 200 && actionUrl === "complete") {
      notifySuccess(
        "/quest",
        response.data.name + "- Completed!",
        "Experience: " + response.data.giveExp,
        "Gold: " + response.data.giveGold,
        "Diamonds: " + response.data.giveDiamonds
      );
    }
  }

  async function getQuests(page) {
    const response = await get(`/api/v1/quests?page=${page}`, headers);
    if (response.status === 200) {
      setTotalPages(response.data.totalPages);
      setAcceptedQuests(response.data.acceptedQuests);
      setNonAcceptedQuests(response.data.quests);
    }
  }

  useEffect(() => {
    getQuests(currentPage);
  }, [currentPage]);

  return (
    <div className="quest">
      <div className="quest--accepted">
        {acceptedQuests.length >= 1 && (
          <div>
            <h1>Quests Acepted</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
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
                      {acceptedQuest.quest.userAmountNeed === 0 ? (
                        <td>
                          Kill {acceptedQuest.quest.npcAmountNeed}{" "}
                          {acceptedQuest.quest.nameNpcKill}. Reward{" "}
                          {acceptedQuest.quest.giveExp} exp,{" "}
                          {acceptedQuest.quest.giveGold} gold,{" "}
                          {acceptedQuest.quest.giveDiamonds} diamonds
                        </td>
                      ) : (
                        <td>
                          Kill {acceptedQuest.quest.userAmountNeed}{" "}
                          {acceptedQuest.quest.nameNpcKill}. Reward{" "}
                          {acceptedQuest.quest.giveExp} exp,{" "}
                          {acceptedQuest.quest.giveGold} gold,{" "}
                          {acceptedQuest.quest.giveDiamonds} diamonds
                        </td>
                      )}
                      <td>{acceptedQuest.quest.nameNpcKill}</td>
                      <td>
                        {acceptedQuest.npcKillAmount} /{" "}
                        {acceptedQuest.quest.npcAmountNeed}
                      </td>
                      <td>
                        {acceptedQuest.userKillAmount} /{" "}
                        {acceptedQuest.quest.userAmountNeed}
                      </td>
                      <td>{acceptedQuest.quest.giveExp}</td>
                      <td>{acceptedQuest.quest.giveGold}</td>
                      <td>{acceptedQuest.quest.giveDiamonds}</td>
                      {acceptedQuest.npcKillAmount >=
                        acceptedQuest.quest.npcAmountNeed &&
                      acceptedQuest.userKillAmount >=
                        acceptedQuest.quest.userAmountNeed ? (
                        <td>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              handleQuests("complete", {
                                name: acceptedQuest.quest.name,
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
                              handleQuests("cancel", {
                                name: acceptedQuest.quest.name,
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
      </div>
      <div className="quest--nonAccepted">
        {nonAcceptedQuests.length >= 1 && (
          <div>
            <h1>Quests</h1>
            {totalPages && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
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
                    {nonAcceptedQuest.quest.userAmountNeed === 0 ? (
                      <td>
                        Kill {nonAcceptedQuest.quest.npcAmountNeed}{" "}
                        {nonAcceptedQuest.quest.nameNpcKill}. Reward{" "}
                        {nonAcceptedQuest.quest.giveExp} exp,{" "}
                        {nonAcceptedQuest.quest.giveGold} gold,{" "}
                        {nonAcceptedQuest.quest.giveDiamonds} diamonds
                      </td>
                    ) : (
                      <td>
                        Kill {nonAcceptedQuest.quest.userAmountNeed}{" "}
                        {nonAcceptedQuest.quest.nameNpcKill}. Reward{" "}
                        {nonAcceptedQuest.quest.giveExp} exp,{" "}
                        {nonAcceptedQuest.quest.giveGold} gold,{" "}
                        {nonAcceptedQuest.quest.giveDiamonds} diamonds
                      </td>
                    )}

                    <td>{nonAcceptedQuest.quest.nameNpcKill}</td>
                    <td>{nonAcceptedQuest.quest.npcAmountNeed}</td>
                    <td>{nonAcceptedQuest.quest.userAmountNeed}</td>
                    <td>{nonAcceptedQuest.quest.giveExp}</td>
                    <td>{nonAcceptedQuest.quest.giveGold}</td>
                    <td>{nonAcceptedQuest.quest.giveDiamonds}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          handleQuests("accept", {
                            name: nonAcceptedQuest.quest.name,
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

export default Quests;
