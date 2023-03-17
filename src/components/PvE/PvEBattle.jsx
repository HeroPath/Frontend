import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import UserCard from "../userProfile/UserCard/UserCard";
import NpcCard from "./NpcCard";
import { TweenMax, Power2 } from "gsap";
import { headers, sounds, capitalizeFirstLetter } from "../../functions/utilities";
import { get } from "../../functions/requestsApi";

import HistoryConsole from "../Battle/HistoryConsole";
import DamageDisplay from "../Battle/DamageDisplay";
import Attack from "../Battle/Attack";

const PvEBattle = () => {
  const location = useLocation();
  const [profile, setProfile] = useState({});
  const [battleData, setBattleData] = useState([]);
  const [stage] = useState([]);
  const [finishBattle, setFinishBattle] = useState(false);
  const [winnerBattle, setWinnerBattle] = useState({});

  async function getPveBattle() {
    const response = await get("/api/v1/users/profile", headers);
    if (response.status === 200) {
      response.data.username = capitalizeFirstLetter(response.data.username);
      if (response.data.hp === 0) response.data.hp = response.data.maxHp;
      setProfile(response.data);
    }
    capitalizeFirstLetter(location.state.battleData.nameData);
    setWinnerBattle(location.state.battleData.pop());
    setBattleData(location.state.battleData);
  }

  useEffect(() => {
    getPveBattle();
  }, []);

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
        <NpcCard npcLife={npcLife} />
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

export default PvEBattle;
