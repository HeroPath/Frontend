import "../../zone/pve.css";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

const NpcCard = ({ npcName, npcLife }) => {
  const [npcData, setNpcData] = useState([]);

  async function getNpcData() {
    // const response = await get("/api/v1/npcs/" + npcName, headers);
    // if (response.status === 200) setNpcData(response.data);
  }

  useEffect(() => {
    getNpcData();
  }, []);

  if (npcLife !== undefined) npcData.hp = npcLife;

  const barHealthWidth = useMemo(() => (npcData.hp * 270) / npcData.maxHp, [npcData.hp, npcData.maxHp]);
  const hpComplete = useMemo(() => `${npcData.hp}/${npcData.maxHp}`, [npcData.hp, npcData.maxHp]);

  return (
    <div className="pvebattle--npccard">
      <form className="pvebattle--npccard--form">
        <h3 className="npcBattleName">{npcName}</h3>
        <div>
          <Image src={require(`@/public/img/npc/${npcName}.webp`)} width={270} height={270} alt="Npc" />
        </div>

        <div className="bar--background" style={{ width: "270px" }}>
          <div className="bar--foreground">{hpComplete}</div>
          <div className="bar--foreground--health" style={{ width: barHealthWidth + "px" }}></div>
        </div>

        <label>
          Dmg: {npcData.minDmg}/{npcData.maxDmg}
        </label>
        <label>Level: {npcData.level}</label>
        <label>Zone: {npcData.zone}</label>
      </form>
    </div>
  );
};

export default NpcCard;
