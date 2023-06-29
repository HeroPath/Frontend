"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/store/slice";
import { TweenMax, Power2 } from "gsap";

import UserCard from "../profile/components/UserCard/UserCard";
import NpcCard from "../components/NpcCard/NpcCard";

import HistoryConsole from "../components/battle/HistoryConsole";
import DamageDisplay from "../components/battle/DamageDisplay";
import Attack from "../components/battle/Attack";

import "react-toastify/dist/ReactToastify.css";
import "../zone/pve.css";

const PveBattle = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.Slice.userData);
  const winnerBattle = useSelector((state) => state.Slice.battleData);
  const battleData = useSelector((state) => state.Slice.battleData);
  const [finishBattle, setFinishBattle] = useState(false);
  const [stage] = useState([]);
  const npcName = battleData.length ? battleData[0].name : "bat";

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  /* -------------------------- INICIO TEST -----------------------------------*/

  const [userLife, setUserLife] = useState(undefined);
  const [npcLife, setNpcLife] = useState(undefined);

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

  const animateFirstAttack = (roundNumber) => {
    const battle = battleData[roundNumber];

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
        sounds(battle.AttackerDmg > 0 ? "hit" : "block");
        showDamage(true, battle.AttackerDmg);
        setNpcLife(battle.NpcLife);
        setFirstAttack({ ...firstAttackRef.current, opacity: 0 });

        if (battle.NpcLife === 0) {
          stage.unshift(battle);
          if (roundNumber >= battleData.length - 1) setFinishBattle(true);
          return;
        }

        TweenMax.to(secondAttack, 0.9, {
          x: "35%",
          y: "25%",
          rotation: -120,
          opacity: 1,
          ease: Power2.easeInOut,
          onUpdate: () => setSecondAttack({ ...secondAttack }),
          onComplete: () => {
            sounds(battle.NpcDmg > 0 ? "hit" : "block");
            setUserLife(battle.AttackerLife);
            showDamage(false, battle.NpcDmg);
            setSecondAttack({ ...secondAttackRef.current, opacity: 0 });

            stage.unshift(battle);
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
      const timeout = setTimeout(() => {
        animateFirstAttack(round);
        setRound(round + 1);
      }, 2000 * (round >= 1 ? 1 : 0.25));
      return () => clearTimeout(timeout);
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
      <DamageDisplay ref={userDmgRef} isUser={true} value={userDamage} />
      <DamageDisplay ref={npcDmgRef} isUser={false} value={npcDamage} />

      <Attack attackData={firstAttack} />
      <Attack attackData={secondAttack} />

      <div className="battle--usercard">
        {profile.aclass && (
          <UserCard
            username={profile.username}
            aclass={profile.aclass}
            hp={profile.hp}
            maxHp={profile.maxHp}
            experience={profile.experience}
            experienceToNextLevel={profile.experienceToNextLevel}
            level={profile.level}
            userLife={userLife}
          />
        )}
      </div>

      <div className="battle--npccard">
        <NpcCard npcName={npcName} npcLife={npcLife} />
      </div>

      <HistoryConsole
        username={profile.username}
        level={profile.level}
        stage={stage}
        winnerBattle={winnerBattle}
        finishBattle={finishBattle}
        npcName={battleData.nameData}
      />
    </div>
  );
};

export default PveBattle;
