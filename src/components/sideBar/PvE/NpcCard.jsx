import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { headers } from "../../../functions/utilities";
import { get } from "../../../functions/requestsApi";

const NpcCard = () => {
  const location = useLocation();
  const npcName = location.state.battleData.nameData;
  const [npcData, setNpcData] = React.useState([]);

  async function getNpcData() {
    const response = await get("/api/v1/npcs/" + npcName, headers);
    if (response.status === 200) setNpcData(response.data);
  }

  useEffect(() => {
    getNpcData();
  }, []);

  let barHealthWidth = (npcData.hp * 250) / npcData.maxHp;

  return (
    <div className="pvebattle--npccard">
      <form className="pvebattle--npccard--form">
        <h3>
          {npcName.replace(/(^\w{1})/g, (letter) => letter.toUpperCase())}
        </h3>
        <div>
          <img
            src={require("../../img/npc/" + npcName + ".webp")}
            width="250px"
            height="315px"
          />
        </div>

        <div className="bar--background" style={{ width: "250px" }}>
          <div
            className="bar--foreground--health"
            style={{ width: barHealthWidth + "px" }}
          >
            {npcData.hp} / {npcData.maxHp}
          </div>
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
