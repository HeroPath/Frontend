import React, { useState, useEffect, useRef } from "react";
import { TweenMax, Power2 } from "gsap";

const AnimationBattle = ({ battleData, setFinishBattle }) => {
  const [stage] = useState([]);

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
        showUserDmg(battle.attackerDmg);
        setFirstAttack({ ...firstAttackRef.current, opacity: 0 });

        TweenMax.to(secondAttack, 0.9, {
          x: "35%",
          y: "25%",
          rotation: -120,
          opacity: 1,
          ease: Power2.easeInOut,
          onUpdate: () => setSecondAttack({ ...secondAttack }),
          onComplete: () => {
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

  return (
    <div style={{ position: "absolute" }}>
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
    </div>
  );
};

export default AnimationBattle;
