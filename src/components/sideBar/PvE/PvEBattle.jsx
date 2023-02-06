import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import UserCard from "../../userProfile/UserCard";
import NpcCard from "./NpcCard";
import { TweenMax, Power2 } from "gsap";
import { headers } from "../../../functions/utilities";
import { get } from "../../../functions/requestsApi";
import { sounds } from "../../../functions/utilities";
import HistoryConsole from "./HistoryConsole";

const PvEBattle = () => {
  const location = useLocation();
  const [profile, setProfile] = useState({});
  const [battleData, setBattleData] = useState([]);
  const [stage] = useState([]);
  const [finishBattle, setFinishBattle] = useState(false);
  const [winnerBattle, setWinnerBattle] = useState({});

  const npcName = location.state.battleData.nameData.replace(/(^\w{1})/g, (letter) => letter.toUpperCase());

  async function getPveBattle() {
    const response = await get("/api/v1/users/profile", headers);
    if (response.status === 200) {
      response.data.username = response.data.username.replace(/(^\w{1})/g, (letter) => letter.toUpperCase());
      setProfile(response.data);
    }
    setWinnerBattle(location.state.battleData.pop());
    setBattleData(location.state.battleData);
  }

  useEffect(() => {
    getPveBattle();
  }, []);

  /* -------------------------- INICIO TEST -----------------------------------*/
  const [firstAttack, setFirstAttack] = useState({
    x: "35%",
    y: "25%",
    rotation: -40,
    opacity: 0,
  });
  const [secondAttack, setSecondAttack] = useState({
    x: "70%",
    y: "25%",
    rotation: -50,
    opacity: 0,
  });

  const firstAttackRef = useRef(firstAttack);
  const secondAttackRef = useRef(secondAttack);

  const animateFirstAttack = (battle, roundNumber) => {
    setFirstAttack({ ...firstAttackRef.current });
    setSecondAttack({ ...secondAttackRef.current });

    TweenMax.to(firstAttack, 0.9, {
      x: "70%",
      y: "25%",
      rotation: 40,
      opacity: 1,
      ease: Power2.easeInOut,
      onUpdate: () => setFirstAttack({ ...firstAttack }),
      onComplete: () => {
        if (battle.AttackerDmg > 0) {
          sounds("hit");
        } else {
          sounds("block");
        }
        showUserDmg(battle.AttackerDmg);
        setFirstAttack({ ...firstAttackRef.current, opacity: 0 });

        TweenMax.to(secondAttack, 0.9, {
          x: "35%",
          y: "25%",
          rotation: -120,
          opacity: 1,
          ease: Power2.easeInOut,
          onUpdate: () => setSecondAttack({ ...secondAttack }),
          onComplete: () => {
            if (battle.NpcDmg > 0) {
              sounds("hit");
            } else {
              sounds("block");
            }
            showNpcDmg(battle.NpcDmg);
            setSecondAttack({ ...secondAttackRef.current, opacity: 0 });
            stage.push(battle);
            if (roundNumber >= battleData.length - 1) setFinishBattle(true);
          },
        });
      },
    });
  };

  const [round, setRound] = useState(0);

  useEffect(() => {
    if (round < battleData.length) {
      firstAttackRef.current = firstAttack;
      secondAttackRef.current = secondAttack;
      setTimeout(() => {
        animateFirstAttack(battleData[round], round);
        setRound(round + 1);
      }, 2000 * (round >= 1 ? 1 : 0.25));
      return () => clearTimeout();
    }
  }, [round, battleData]);

  const [userDamage, setUserDamage] = useState(0);
  const [npcDamage, setNpcDamage] = useState(0);
  const userDmgRef = useRef(null);
  const npcDmgRef = useRef(null);

  const showUserDmg = (value) => {
    TweenMax.to(userDmgRef.current, 0.5, {
      y: -20,
      opacity: 1,
      ease: Power2.easeOut,
      onComplete: () => {
        TweenMax.to(userDmgRef.current, 0.5, {
          opacity: 0,
        });
      },
    });
    setUserDamage(value);
  };

  const showNpcDmg = (value) => {
    TweenMax.to(npcDmgRef.current, 0.5, {
      y: -20,
      opacity: 1,
      ease: Power2.easeOut,
      onComplete: () => {
        TweenMax.to(npcDmgRef.current, 0.5, {
          opacity: 0,
        });
      },
    });
    setNpcDamage(value);
  };
  /* -------------------------- FIN TEST -----------------------------------*/

  return (
    <div className="battle">
      {/* ----------------------------- INICIO TEST ----------------------------- */}

      <div
        ref={userDmgRef}
        style={{
          position: "absolute",
          backgroundColor: "transparent",
          color: "#ff1744",
          padding: "0",
          borderRadius: "0",
          fontSize: "60px",
          fontWeight: "bold",
          textShadow: "3px 3px #333",
          opacity: 0,
          left: "76%",
          top: "15%",
        }}
      >
        {userDamage}
      </div>
      <div
        ref={npcDmgRef}
        style={{
          position: "absolute",
          backgroundColor: "transparent",
          color: "#ff1744",
          padding: "0",
          borderRadius: "0",
          fontSize: "60px",
          fontWeight: "bold",
          textShadow: "3px 3px #333",
          opacity: 0,
          left: "34%",
          top: "15%",
        }}
      >
        {npcDamage}
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
          opacity: firstAttack.opacity,
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
          opacity: secondAttack.opacity,
        }}
      />

      {/* ----------------------------- FIN TEST ----------------------------- */}

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

      <HistoryConsole
        profile={profile}
        stage={stage}
        winnerBattle={winnerBattle}
        finishBattle={finishBattle}
        npcName={npcName}
      />
    </div>
  );
};

export default PvEBattle;
