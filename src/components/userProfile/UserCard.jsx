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
  let barExpWidth = (experience * 250) / experienceToNextLevel;
  let barHealthWidth = (hp * 250) / maxHp;

  let hpComplete = `${hp}/${maxHp}`;

  let expComplete = `${experience} / ${experienceToNextLevel}`;
  let percentExp = ((experience / experienceToNextLevel) * 100).toFixed(2);

  const [showPercentExp, setShowPercentExp] = React.useState(true);
  const [showExpComplete, setShowExpComplete] = React.useState(false);

  return (
    <div className="userCard--card">
      <h4 className="p-1">{username}</h4>
      <img
        src={require("../img/class/" + aclass.name + ".jpg")}
        width="250px"
        height="315px"
        alt=""
      />

      <div className="bar--background" style={{ width: "250px" }}>
        <div
          className="bar--foreground--health"
          style={{ width: barHealthWidth + "px" }}
        >
          {hpComplete}
        </div>
      </div>

      <div className="bar--background" style={{ width: "250px" }}>
        {experience && (
          <div
            className="bar--foreground--exp"
            style={{ width: barExpWidth + "px" }}
            onClick={() => {
              setShowExpComplete(showExpComplete ? false : true);
              setShowPercentExp(showPercentExp ? false : true);
            }}
          >
            {showPercentExp && percentExp + "%"}
            {showExpComplete && expComplete}
          </div>
        )}
      </div>

      <label>Level: {level}</label>
      <label>Class: {aclass.name}</label>
    </div>
  );
};

export default UserCard;
