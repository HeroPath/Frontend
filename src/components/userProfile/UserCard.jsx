import React from "react";
import { capitalizeFirstLetter } from "../../functions/utilities";

const UserCard = ({
  username,
  aclass,
  hp,
  maxHp,
  experience,
  experienceToNextLevel,
  level,
  userCard,
}) => {
  /* --------- TEST ---------- */

  if (userCard !== undefined) {
    hp = userCard.newHp;
    maxHp = userCard.newMaxHp;
  }

  /* --------- TEST ---------- */

  let barHealthWidth = (hp * 270) / maxHp;
  let barExpWidth = (experience * 270) / experienceToNextLevel;
  let hpComplete = `${hp}/${maxHp}`;
  let expComplete = `${experience} / ${experienceToNextLevel}`;
  let percentExp =
    level < 300
      ? ((experience / experienceToNextLevel) * 100).toFixed(2) + "%"
      : "Lvl Max";

  const [showPercentExp, setShowPercentExp] = React.useState(true);
  const [showExpComplete, setShowExpComplete] = React.useState(false);

  return (
    <div className="userCard--card">
      <div className="userCard--card--bgName">
        <h3>{capitalizeFirstLetter(username)}</h3>
      </div>
      <img
        src={require("../img/class/" + aclass.name + ".webp")}
        width="270px"
        height="270px"
        alt=""
      />

      <div className="bar--background" style={{ width: "270px" }}>
        <div className="bar--foreground">{hpComplete}</div>
        <div
          className="bar--foreground--health"
          style={{ width: barHealthWidth + "px" }}
        />
      </div>

      <div className="bar--background" style={{ width: "270px" }}>
        <div
          className="bar--foreground"
          onClick={() => {
            setShowExpComplete(!showExpComplete);
            setShowPercentExp(!showPercentExp);
          }}
        >
          {showPercentExp && percentExp}
          {showExpComplete && expComplete}
        </div>
        <div
          className="bar--foreground--exp"
          style={{ width: barExpWidth + "px" }}
        />
      </div>

      <label>Level: {level}</label>
      <label>Class: {capitalizeFirstLetter(aclass.name)}</label>
    </div>
  );
};

export default UserCard;
