import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { headers, capitalizeFirstLetter } from "../../../functions/utilities";
import { get } from "../../../functions/requestsApi";

const NpcCard = ({ npcLife }) => {
  const location = useLocation();
  const npcName = location.state.battleData.nameData;
  const [npcData, setNpcData] = useState([]);

  async function getNpcData() {
    const response = await get("/api/v1/npcs/" + npcName, headers);
    if (response.status === 200) setNpcData(response.data);
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
        <h3 className="npcBattleName">{capitalizeFirstLetter(npcName)}</h3>
        <div>
          <img src={require("../../img/npc/" + npcName + ".webp")} width="270px" height="270px" />
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
