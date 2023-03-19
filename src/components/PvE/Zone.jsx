import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../functions/utilities";
import { zoneMap } from "../../functions/constants";
import "./pve.css";

const Zone = () => {
  const navigate = useNavigate();

  return (
    <div className="zone">
      {zoneMap.map((zone, index) => (
        <div className="zoneCard" key={index}>
          <h4>{capitalizeFirstLetter(zone.name)}</h4>
          <form
            key={index}
            className="zoneForm"
            style={{
              backgroundImage: `url(${require("../../img/zone/" + zone.name + ".webp")})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "225px",
              width: "365px",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <a
              className="button--links links buttons-zone"
              type="submit"
              onClick={() => {
                navigate("/playervsnpc", {
                  state: { id: zone.name, name: zone.name },
                });
              }}
            >
              Travel
            </a>
          </form>
          <p>
            Recommended lvl: {zone.rLvlMin} / {zone.rLvlMax}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Zone;
