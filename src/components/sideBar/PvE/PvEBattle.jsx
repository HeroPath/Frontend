import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import UserCard from "../../userProfile/UserCard";
import NpcCard from "./NpcCard";
import { TweenMax, Power2 } from "gsap";
import { headers } from "../../../functions/utilities";
import { get } from "../../../functions/requestsApi";

const PvEBattle = () => {
  const location = useLocation();
  const [profile, setProfile] = useState({});
  const [battleData, setBattleData] = useState([]);
  const [winnerBattle, setWinnerBattle] = useState({});
  let i = 1;

  /* -------------------------- TEST -----------------------------------*/
  const [firstAttack, setFirstAttack] = useState({
    x: "35%",
    y: "25%",
    rotation: -40,
  });
  const [secondAttack, setSecondAttack] = useState({
    x: "70%",
    y: "25%",
    rotation: -50,
  });

  const [damage, setDamage] = useState(0);
  const damageRef = useRef(null);

  const showDamage = (value) => {
    TweenMax.to(damageRef.current, 0.5, {
      y: -20,
      opacity: 1,
      ease: Power2.easeOut,
      onComplete: () => {
        TweenMax.to(damageRef.current, 0.5, {
          opacity: 0,
          delay: 1,
        });
      },
    });
    setDamage(value);
    console.log(value);
  };

  const animateFirstAttack = (userDmg, npcDmg) => {
    TweenMax.to(firstAttack, 1, {
      x: "70%",
      y: "25%",
      rotation: 40,
      ease: Power2.easeInOut,
      onUpdate: () => setFirstAttack({ ...firstAttack }),
      onComplete: () => {
        showDamage(userDmg);
        setFirstAttack({
          x: "35%",
          y: "25%",
          rotation: -40,
        });
        animateSecondAttack();
      },
    });
  };

  const animateSecondAttack = (userDmg, npcDmg) => {
    TweenMax.to(secondAttack, 0.5, {
      x: "35%",
      y: "25%",
      rotation: -125,
      ease: Power2.easeInOut,
      onUpdate: () => setSecondAttack({ ...secondAttack }),
      onComplete: () => {
        showDamage(npcDmg);
        setSecondAttack({
          x: "70%",
          y: "25%",
          rotation: -50,
        });
      },
    });
  };

  useEffect(() => {
    battleData.forEach((data, index) => {
      console.log(data.attackerDmg, data.npcDmg);
      animateFirstAttack(data.attackerDmg, data.NpcDmg);
    });
  }, [battleData]);

  /* -------------------------- TEST -----------------------------------*/
  const npcName = location.state.battleData.nameData.replace(
    /(^\w{1})/g,
    (letter) => letter.toUpperCase()
  );

  async function getPveBattle() {
    const response = await get("/api/v1/users/profile", headers);
    if (response.status === 200) {
      response.data.username = response.data.username.replace(
        /(^\w{1})/g,
        (letter) => letter.toUpperCase()
      );
      setProfile(response.data);
    }
    setWinnerBattle(location.state.battleData.pop());
    setBattleData(location.state.battleData);
    // console.log(location.state.battleData);
  }

  useEffect(() => {
    getPveBattle();
  }, []);

  return (
    <div className="battle">
      <div className="battle--usercard">
        {profile.aclass && (
          <UserCard
            key={profile.username}
            username={profile.username}
            aclass={profile.aclass}
            hp={profile.hp}
            maxHp={profile.maxHp}
            experience={profile.experience}
            experienceToNextLevel={profile.experienceToNextLevel}
            level={profile.level}
          />
        )}
      </div>

      <div className="battle--npccard">
        <NpcCard />
      </div>
      {/* ----------------------------- TEST ----------------------------- */}
      <div
        ref={damageRef}
        style={{
          position: "absolute",
          color: "red",
          fontSize: "24px",
          opacity: 0,
        }}
        onClick={showDamage}
      >
        {damage}
      </div>
      <div
        id="firstAttack"
        style={{
          backgroundImage: `url(${require("../../img/utilities/sword.webp")})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          width: "8%",
          height: "15%",
          position: "absolute",
          transform: `rotate(${firstAttack.rotation}deg)`,
          left: firstAttack.x,
          top: firstAttack.y,
        }}
      />
      <div
        id="secondAttack"
        style={{
          backgroundImage: `url(${require("../../img/utilities/sword.webp")})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          width: "8%",
          height: "15%",
          position: "absolute",
          transform: `rotate(${secondAttack.rotation}deg)`,
          left: secondAttack.x,
          top: secondAttack.y,
        }}
      />

      {/* ----------------------------- TEST ----------------------------- */}

      <div className="rounds--console">
        <div className="history-box">
          {battleData?.map((rounds) => (
            <ul key={i++} className="round">
              <h6>Round: {rounds.round}</h6>
              <div>
                <li>
                  {profile.username} attacked {npcName} for{" "}
                  {rounds.attackerDmg.toLocaleString()} dmg. ({npcName} life:{" "}
                  {rounds.NpcLife.toLocaleString()})
                </li>
                <li>
                  {npcName} attacked {profile.username} for{" "}
                  {rounds.NpcDmg.toLocaleString()} dmg. ({profile.username}{" "}
                  life: {rounds.attackerLife.toLocaleString()})
                </li>
              </div>
            </ul>
          ))}
          {winnerBattle && (
            <ul className="round winner">
              <h6>Final</h6>
              <div>
                <li>Winner: {winnerBattle.win}</li>
                <li>Loser: {winnerBattle.lose}</li>
                {winnerBattle.userExperienceGain && (
                  <li>
                    Experience gained:{" "}
                    {winnerBattle.userExperienceGain.toLocaleString()}
                  </li>
                )}
                {winnerBattle.goldAmountWin && (
                  <li>
                    Gold won: {winnerBattle.goldAmountWin.toLocaleString()}
                  </li>
                )}

                {winnerBattle.diamondsAmonutWin && (
                  <li>Diamond won: {winnerBattle.diamondsAmonutWin}</li>
                )}
                {winnerBattle.levelUp === true && (
                  <li>
                    Congratulations, you have reached level {profile.level}
                  </li>
                )}
              </div>
            </ul>
          )}
        </div>
        <div className="rounds--console--buttons">
          <a href="/profile" className="button--links links">
            Profile
          </a>
          <a href="/zone" className="button--links links">
            Zone
          </a>
        </div>
      </div>
    </div>
  );
};

export default PvEBattle;
