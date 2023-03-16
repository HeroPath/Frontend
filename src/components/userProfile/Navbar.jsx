import { useState, useEffect } from "react";
import { get } from "../../functions/requestsApi";
import { headers } from "../../functions/utilities";

const Navbar = ({ gold, diamond, pvePts, pvpPts }) => {
  const [pvpAndPvePts, setPvpAndPvePts] = useState({});

  useEffect(() => {
    async function getPveAndPvpMaxPts() {
      const response = await get("/api/v1/stats/pve-pvp/pts", headers);
      if (response.status === 200) {
        setPvpAndPvePts(response.data);
      }
    }

    getPveAndPvpMaxPts();
  }, []);

  return (
    <div className="profileNavbar">
      <div className="profileNavbar--labels">
        <div>
          <img className="me-2" src={require(`../../img/utilities/gold.webp`)} alt="" />
          {gold && <label>{gold.toLocaleString()}</label>}
        </div>
        <div>
          <img className="me-2" src={require(`../../img/utilities/diamond.webp`)} alt="" />
          {diamond && <label>{diamond.toLocaleString()}</label>}
        </div>
      </div>
      {pvpAndPvePts.maxPvePts && pvePts && (
        <div>
          <label>
            PvE Pts: {pvePts}/{pvpAndPvePts.maxPvePts}
          </label>
        </div>
      )}
      {pvpAndPvePts.maxPvpPts && pvpPts && (
        <div className="navBarDivs">
          <label>
            PvP Pts: {pvpPts}/{pvpAndPvePts.maxPvpPts}
          </label>
        </div>
      )}
      <div className="navBarDivs">
        <label>News (Coming Soon)</label>
      </div>
    </div>
  );
};

export default Navbar;
