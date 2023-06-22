import { useDispatch } from "react-redux";
import { fetchAddStat } from "@/store/slice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Stat from "./Stat.jsx";

const UserStats = ({ profile }) => {
  const dispatch = useDispatch();

  const {
    freeSkillPoints,
    strength,
    dexterity,
    vitality,
    intelligence,
    luck,
    minDmg,
    maxDmg,
    npcKills,
    defense,
    evasion,
    criticalChance,
    hp,
    maxHp,
    aclass,
    pvpLosses,
    pvpWins,
  } = profile;

  async function handleClickAddSkill(skillName) {
    dispatch(fetchAddStat(skillName));
  }

  const getSecondStatName = () => {
    if (aclass === "warrior") return "Dmg";
    if (aclass === "archer") return "Evasion";
    return "Defense";
  };

  const getSecondStatValue = () => {
    if (aclass === "warrior") return `${minDmg}/${maxDmg}`;
    if (aclass === "archer") return `${minDmg}/${maxDmg}`;
    return defense;
  };

  const getThirdStatName = () => {
    if (aclass === "mage") return "Dmg";
    if (aclass === "archer") return "Evasion";
    return "Defense";
  };

  const getThirdStatValue = () => {
    if (aclass === "mage") return `${minDmg}/${maxDmg}`;
    if (aclass === "archer") return evasion;
    return defense;
  };

  return (
    <>
      <section className="userstats">
        <h2>Stats</h2>
        <label className="m-2">Free skill points: {freeSkillPoints}</label>

        <form className="userstats--form">
          <Stat
            firstStatName={"Strength"}
            FirstStatValue={strength}
            secondStatName={getSecondStatName()}
            secondStatValue={getSecondStatValue()}
            handleClick={handleClickAddSkill}
          />
          <Stat
            firstStatName={"Dexterity"}
            FirstStatValue={dexterity}
            secondStatName={getSecondStatName()}
            secondStatValue={getSecondStatValue()}
            handleClick={handleClickAddSkill}
          />
          <Stat
            firstStatName={"Intelligence"}
            FirstStatValue={intelligence}
            secondStatName={getThirdStatName()}
            secondStatValue={getThirdStatValue()}
            handleClick={handleClickAddSkill}
          />
          <Stat
            firstStatName={"Vitality"}
            FirstStatValue={vitality}
            secondStatName={"Life"}
            secondStatValue={`${hp}/${maxHp}`}
            handleClick={handleClickAddSkill}
          />
          <Stat
            firstStatName={"Luck"}
            FirstStatValue={luck}
            secondStatName={"Crit Dmg"}
            secondStatValue={`${Math.round(criticalChance * 10) / 10}%`}
            handleClick={handleClickAddSkill}
          />
        </form>

        <div className="userstats--info">
          <div className="userstats--data">
            <div className="userstats--labels">
              <div className="userstats--dataStat">
                <label>Pvp wins:</label>
                <span>{pvpWins}</span>
              </div>
              <div className="userstats--dataStat">
                <label>Pvp losses:</label>
                <span>{pvpLosses}</span>
              </div>
              <div className="userstats--dataStat">
                <label>Npc killed:</label>
                <span>{npcKills}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
};

export default UserStats;
