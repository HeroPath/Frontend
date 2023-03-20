import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Pagination from "../Pagination/Pagination";
import "react-toastify/dist/ReactToastify.css";
import "./quests.css";
import QuestInfo from "./QuestInfo";

import { headers, notifySuccess } from "../../functions/utilities";
import { get, post } from "../../functions/requestsApi";

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

  const [showAccepted, setShowAccepted] = useState(false);
  const [focusedButton, setFocusedButton] = useState(0);
  const [focusedButtonAccepted, setFocusedButtonAccepted] = useState(0);
  const [nameQuest, setNameQuest] = useState("");

  {
    !showAccepted
      ? useEffect(() => {
          if (nonAcceptedQuests.length > 0) {
            setNameQuest(nonAcceptedQuests[0].quest.name);
          }
        }, [nonAcceptedQuests])
      : useEffect(() => {
          if (acceptedQuests.length > 0) {
            setNameQuest(acceptedQuests[0].quest.name);
          }
        }, [nonAcceptedQuests]);
  }

  return (
    <div className="quest">
      <>
        <div className="divTables">
          <div className="quest-button">
            <button
              onClick={() => {
                setShowAccepted(false);
              }}
              className={showAccepted === false ? "active" : ""}
            >
              QUESTS
            </button>
            <button
              onClick={() => {
                setShowAccepted(true);
              }}
              className={showAccepted === true ? "active" : ""}
              disabled={acceptedQuests.length === 0}
            >
              QUESTS ACCEPTED
            </button>
          </div>
          {showAccepted === false ? (
            <table className="quests-tables">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Target</th>
                  <th>Req NPC</th>
                  <th>Req User</th>
                </tr>
              </thead>
              <tbody>
                {nonAcceptedQuests?.map((nonAcceptedQuest, index) => (
                  <tr
                    key={index}
                    className={focusedButton === index ? "active" : ""}
                    onClick={() => {
                      setNameQuest(nonAcceptedQuest.quest.name);
                      setFocusedButton(index);
                    }}
                  >
                    <td>{nonAcceptedQuestsNumber++}</td>
                    <td>{nonAcceptedQuest.quest.name}</td>
                    <td>{nonAcceptedQuest.quest.nameNpcKill}</td>
                    <td>{nonAcceptedQuest.quest.npcAmountNeed}</td>
                    <td>{nonAcceptedQuest.quest.userAmountNeed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            acceptedQuests.length >= 1 && (
              <table className="quests-tables">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Target</th>
                    <th>Req NPC</th>
                    <th>Req User</th>
                  </tr>
                </thead>

                {acceptedQuests &&
                  acceptedQuests?.length >= 1 &&
                  acceptedQuests?.map((acceptedQuest, index) => (
                    <tbody key={index}>
                      <tr
                        key={index}
                        className={focusedButtonAccepted === index ? "active" : ""}
                        onClick={() => {
                          setNameQuest(acceptedQuest.quest.name);
                          setFocusedButtonAccepted(index);
                        }}
                      >
                        <td>{acceptedQuestNumber++}</td>
                        <td>{acceptedQuest.quest.name}</td>
                        <td>{acceptedQuest.quest.nameNpcKill}</td>
                        <td>
                          {acceptedQuest.npcKillAmount} / {acceptedQuest.quest.npcAmountNeed}
                        </td>
                        <td>
                          {acceptedQuest.userKillAmount} / {acceptedQuest.quest.userAmountNeed}
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            )
          )}
        </div>

        {showAccepted
          ? acceptedQuests[focusedButtonAccepted] && <QuestInfo focus={acceptedQuests[focusedButtonAccepted]} />
          : nonAcceptedQuests[focusedButton] && <QuestInfo focus={nonAcceptedQuests[focusedButton]} />}

        {!showAccepted ? (
          totalPages > 1 ? (
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
          ) : (
            <div></div>
          )
        ) : (
          <div></div>
        )}

        <div className="quest-info-button">
          {showAccepted ? (
            <>
              <button
                className="cancel"
                onClick={() => {
                  setFocusedButtonAccepted(0);
                  handleQuests("cancel", { name: nameQuest });
                }}
              >
                CANCEL
              </button>
              <button
                className="completed"
                onClick={() => {
                  setFocusedButtonAccepted(0);
                  handleQuests("complete", { name: nameQuest });
                }}
              >
                COMPLETED
              </button>
            </>
          ) : (
            nameQuest !== "" && (
              <button
                className="accept"
                onClick={() => {
                  handleQuests("accept", { name: nameQuest });
                }}
              >
                ACCEPT
              </button>
            )
          )}
        </div>
      </>
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
