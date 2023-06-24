import { useState, useMemo } from "react";
import { titleColor } from "@/functions/constants";
import Image from "next/image";
import "./userCard.css";

const UserCard = ({
  username,
  aclass,
  hp,
  maxHp,
  experience,
  experienceToNextLevel,
  level,
  guildName,
  titleName,
  titlePoints,
  sendFromProfile,
}) => {
  const titleColorValue = titleColor[titleName];
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
    () => (level < 350 ? ((experience / experienceToNextLevel) * 100).toFixed(2) + "%" : "Lvl Max"),
    [level, experience, experienceToNextLevel]
  );

  return (
    <div className="userCard--card">
      <div className="userCard--card--bgName">
        <h3>{username}</h3>
      </div>
      <Image src={require(`@/public/img/class/${aclass}.webp`)} width={270} height={270} alt="class" />
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
            <span>{aclass}</span>
          </div>
          <div className="userCard--stats">
            <label>Guild: </label>
            <span>{guildName ? guildName : "None"}</span>
          </div>
          <div className="userCard--stats">
            <label>Title: </label>
            <span style={{ color: titleColorValue }}>{titleName}</span>
          </div>
          <div className="userCard--stats">
            <label>MMR: </label>
            <span>{titlePoints}</span>
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
