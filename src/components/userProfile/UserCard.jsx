import { useMemo, useState } from "react";
import { capitalizeFirstLetter } from "../../functions/utilities";

const UserCard = ({ username, aclass, hp, maxHp, experience, experienceToNextLevel, level, userNewData, userLife }) => {
  if (userLife !== undefined) hp = userLife;

  if (userNewData !== undefined) {
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
      <img src={require(`../../img/class/${aclass}.webp`)} width="270px" height="270px" alt="" />

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

      <label>Level: {level}</label>
      <label>Class: {capitalizeFirstLetter(aclass)}</label>
    </div>
  );
};

export default UserCard;
