import React from "react";
import { useNavigate } from "react-router-dom";

const Zone = () => {
  const zoneMap = [
    { name: "forest", rLvlMin: "1", rLvlMax: "30" },
    { name: "caves", rLvlMin: "30", rLvlMax: "50" },
    { name: "desert", rLvlMin: "50", rLvlMax: "60" },
    { name: "sea", rLvlMin: "60", rLvlMax: "70" },
    { name: "mountain", rLvlMin: "70", rLvlMax: "85" },
    { name: "hell", rLvlMin: "85", rLvlMax: "100" },
  ];


  const navigate = useNavigate();

  return (
    <div className="zone">
      {zoneMap.map((zone) => (
        <form key={zone.name} className="zoneForm">
          <h4>{zone.name}</h4>

          <img
            src={require("../../img/zone/" + zone.name + ".jpg")}
            width="324px"
            height="206px"
            alt=""
          />

          <a
            className="button--links links mt-1"
            type="submit"
            onClick={() => {
              navigate("/playervsnpc", {
                state: { id: zone.name, name: zone.name },
              });
            }}
          >
            Travel
          </a>
          <p>
            Recommended lvl: {zone.rLvlMin} / {zone.rLvlMax}
          </p>
        </form>
      ))}
    </div>
  );
};

export default Zone;