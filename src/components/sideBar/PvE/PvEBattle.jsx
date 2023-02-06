import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import UserCard from "../../userProfile/UserCard";
import NpcCard from "./NpcCard";
import { TweenMax, Power2 } from "gsap";
import { headers } from "../../../functions/utilities";
import { get } from "../../../functions/requestsApi";
import { sounds } from "../../../functions/utilities";
import HistoryConsole from "./HistoryConsole";
import DamageDisplay from "./DamageDisplay";
import Attack from "./Attack";

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
        showDamage(true, battle.AttackerDmg);
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
            showDamage(false, battle.NpcDmg);

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

  const showDamage = (isUser, value) => {
    const damageRef = isUser ? userDmgRef : npcDmgRef;
    const setDamage = isUser ? setUserDamage : setNpcDamage;
    TweenMax.to(damageRef.current, 0.5, {
      y: -20,
      opacity: 1,
      ease: Power2.easeOut,
      onComplete: () => {
        TweenMax.to(damageRef.current, 0.5, {
          opacity: 0,
        });
      },
    });
    setDamage(value);
  };

  /* -------------------------- FIN TEST -----------------------------------*/

  return (
    <div className="battle">
      {/* ----------------------------- INICIO TEST ----------------------------- */}

      <DamageDisplay ref={userDmgRef} isUser={true} value={userDamage} />
      <DamageDisplay ref={npcDmgRef} isUser={false} value={npcDamage} />

      <Attack attackData={firstAttack} />
      <Attack attackData={secondAttack} />

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
