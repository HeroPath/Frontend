import React from "react";
import { useLocation } from "react-router-dom";

const NpcCard = () => {
  const location = useLocation();

  const npcName = location.state.battleData.nameData;


  return (
    <div className="pvebattle--npccard">
      <form>
        <h2>
          {npcName.replace(/(^\w{1})/g, (letter) => letter.toUpperCase())}
        </h2>
        <div>
          <img
            src={require("../../img/npc/squirtle.jpg")}
            width="200px"
            height="206px"
            alt=""
          />
        </div>
      </form>
    </div>
  );
};

export default NpcCard;
