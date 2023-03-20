import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Pagination from "../Pagination/Pagination";
import "react-toastify/dist/ReactToastify.css";
import "./quests.css";
import QuestInfo from "./QuestInfo";
import Table from "./Table";

import { headers, notifySuccess } from "../../functions/utilities";
import { get, post } from "../../functions/requestsApi";

const Quests = () => {
  const [nonAcceptedQuests, setNonAcceptedQuests] = useState([]);
  const [acceptedQuests, setAcceptedQuests] = useState([]);

  async function handleQuests(actionUrl, values) {
    const response = await post("/api/v1/quests/" + actionUrl, values, headers);
    if (response.status === 200) {
      getQuests();
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

  async function getQuests() {
    const response = await get("/api/v1/quests", headers);
    if (response.status === 200) {
      setAcceptedQuests(response.data.acceptedQuests);
      setNonAcceptedQuests(response.data.quests);
    }
  }

  useEffect(() => {
    getQuests();
  }, []);

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

  useEffect(() => {
    if (acceptedQuests.length === 0) setShowAccepted(false);
    if (nonAcceptedQuests.length === 0) setShowAccepted(true);
  }, [acceptedQuests]);

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
              disabled={nonAcceptedQuests.length === 0}
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
          <div className="tableScroll">
            {showAccepted === false ? (
              nonAcceptedQuests.length > 0 && (
                <Table
                  quests={nonAcceptedQuests}
                  focus={focusedButton}
                  setNameQuest={setNameQuest}
                  setFocus={setFocusedButton}
                />
              )
            ) : (
              <Table
                quests={acceptedQuests}
                focus={focusedButtonAccepted}
                setNameQuest={setNameQuest}
                setFocus={setFocusedButtonAccepted}
              />
            )}
          </div>
        </div>

        {showAccepted
          ? acceptedQuests[focusedButtonAccepted] && <QuestInfo focus={acceptedQuests[focusedButtonAccepted]} />
          : nonAcceptedQuests[focusedButton] && <QuestInfo focus={nonAcceptedQuests[focusedButton]} />}

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
