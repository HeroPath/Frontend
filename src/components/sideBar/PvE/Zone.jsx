import React from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utilities";

const Zone = () => {
  const zoneMap = [
    { name: "forest", rLvlMin: "1", rLvlMax: "45" },
    { name: "caves", rLvlMin: "46", rLvlMax: "90" },
    { name: "desert", rLvlMin: "91", rLvlMax: "135" },
    { name: "sea", rLvlMin: "136", rLvlMax: "180" },
    { name: "mountain", rLvlMin: "181", rLvlMax: "225" },
    { name: "hell", rLvlMin: "226", rLvlMax: "300" },
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
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
            Recommended lvl: {zone.rLvlMin} / {zone.rLvlMax}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Zone;
