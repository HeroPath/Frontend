import React from "react";
import "../utilities.js";

const UserCard = ({
  username,
  aclass,
  hp,
  maxHp,
  experience,
  experienceToNextLevel,
  level,
}) => {
  let barHealthWidth = (hp * 250) / maxHp;
  let barExpWidth = (experience * 250) / experienceToNextLevel;
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
      <h3>{username}</h3>
      <img
        src={require("../img/class/" + aclass.name + ".jpg")}
        width="250px"
        height="315px"
        alt=""
      />

      <div className="bar--background" style={{ width: "250px" }}>
        <div className="bar--foreground">{hpComplete}</div>
        <div
    className="bar--foreground--health"
    style={{width: barHealthWidth + "px"}}
    />
      </div>

      <div className="bar--background" style={{ width: "250px" }}>
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
    style={{width: barExpWidth + "px"}}
    />
      </div>

      <label>Level: {level}</label>
      <label>Class: {aclass.name}</label>
    </div>
  );
};

export default UserCard;
