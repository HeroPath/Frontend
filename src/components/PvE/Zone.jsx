import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../functions/utilities";
import { zoneMap } from "../../functions/constants";

const Zone = () => {
  const navigate = useNavigate();

  return (
    <div className="zone">
      {zoneMap.map((zone, index) => (
        <div style={divStyle} key={index}>
          <h4>{capitalizeFirstLetter(zone.name)}</h4>
          <form
            key={index}
            className="zoneForm"
            style={{
              backgroundImage: `url(${require("../../img/zone/" + zone.name + ".webp")})`,
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
          <p style={pStyle}>
            Recommended lvl: {zone.rLvlMin} / {zone.rLvlMax}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Zone;

const divStyle = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const pStyle = { fontWeight: "bold", fontSize: "20px" };
