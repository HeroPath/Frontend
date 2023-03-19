import { useMemo, useState } from "react";
import "./userCard.css";
import { capitalizeFirstLetter } from "../../../functions/utilities";
import { titleColor } from "../../../functions/constants";

const UserCard = ({
  username,
  aclass,
  hp,
  maxHp,
  experience,
  experienceToNextLevel,
  level,
  userNewData,
  userLife,
  guildName,
  titleName,
  titlePoints,
  titlePointsToNextLevel,
  sendFromProfile,
}) => {
  if (userLife !== undefined) hp = userLife;

  if (userNewData !== false && userNewData !== undefined) {
    hp = userNewData.hp;
    maxHp = userNewData.maxHp;
  }

  const [showPercentExp, setShowPercentExp] = useState(true);
  const [showExpComplete, setShowExpComplete] = useState(false);

  const barHealthWidth = useMemo(() => (hp * 270) / maxHp, [hp, maxHp]);
  const barExpWidth = useMemo(() => (experience * 270) / experienceToNextLevel, [experience, experienceToNextLevel]);
  const hpComplete = useMemo(() => `${hp}/${maxHp}`, [hp, maxHp]);
  const expComplete = useMemo(
    () => `${experience.toLocaleString()} / ${experienceToNextLevel.toLocaleString()}`,
    [experience, experienceToNextLevel]
  );
  const percentExp = useMemo(
    () => (level < 300 ? ((experience / experienceToNextLevel) * 100).toFixed(2) + "%" : "Lvl Max"),
    [level, experience, experienceToNextLevel]
  );

  return (
    <div className="userCard--card">
      <div className="userCard--card--bgName">
        <h3>{capitalizeFirstLetter(username)}</h3>
      </div>
      <img src={require(`../../../img/class/${aclass}.webp`)} width="270px" height="270px" />

      <div className="bar--background" style={{ width: "270px" }}>
        <div className="bar--foreground">{hpComplete}</div>
        <div className="bar--foreground--health" style={{ width: barHealthWidth + "px" }} />
      </div>

      <div className="bar--background" style={{ width: "270px" }}>
        <div
          className="bar--foreground"
          onClick={() => {
            setShowExpComplete(!showExpComplete);
            setShowPercentExp(!showPercentExp);
          }}
        >
          {showPercentExp ? percentExp : expComplete}
        </div>

        <div className="bar--foreground--exp" style={{ width: barExpWidth + "px" }} />
      </div>

      {sendFromProfile ? (
        <div className="userCard--info">
          <div className="userCard--stats">
            <label>Level: </label>
            <span>{level}</span>
          </div>
          <div className="userCard--stats">
            <label>Class: </label>
            <span>{capitalizeFirstLetter(aclass)}</span>
          </div>
          <div className="userCard--stats">
            <label>Guild: </label>
            <span>{guildName ? guildName : "None"}</span>
          </div>
          <div className="userCard--stats">
            <label>Title: </label>
            <span>{titleName}</span>
          </div>
          <div className="userCard--stats">
            <label>MMR: </label>
            <span>
              {titlePoints} / {titlePointsToNextLevel}
            </span>
          </div>
        </div>
      ) : (
        <>
          <label>Level: {level} </label>
          <label>Class: {aclass}</label>
        </>
      )}
    </div>
  );
};

export default UserCard;
