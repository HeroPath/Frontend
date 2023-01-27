import React from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utilities";

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
      {zoneMap.map((zone, index) => (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          key={index}
        >
          <h4>{capitalizeFirstLetter(zone.name)}</h4>
          <form
            key={index}
            className="zoneForm"
            style={{
              backgroundImage: `url(${require("../../img/zone/" +
                zone.name +
                ".webp")})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "250px",
              width: "405px",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <a
              className="button--links links"
              type="submit"
              style={{
                display: "flex",
                color: "white",
                fontWeight: "bold",
                fontSize: "25px",
                height: "40px",
                width: "100%",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: "0px",
                padding: "0px",
              }}
              onClick={() => {
                navigate("/playervsnpc", {
                  state: { id: zone.name, name: zone.name },
                });
              }}
            >
              Travel
            </a>
          </form>
          <p style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>
            Recommended lvl: {zone.rLvlMin} / {zone.rLvlMax}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Zone;
