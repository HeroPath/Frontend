import { useState, useEffect } from "react";
import { get } from "../../../functions/requestsApi";
import { headers } from "../../../functions/utilities";
import "./navbar.css";

const Navbar = ({ gold, diamond, pvePts, pvpPts }) => {
  const [pvpAndPvePts, setPvpAndPvePts] = useState({});
  const [activeEvent, setActiveEvent] = useState({});

  useEffect(() => {
    async function getPveAndPvpMaxPts() {
      const response = await get("/api/v1/stats/pve-pvp/pts", headers);
      if (response.status === 200) {
        setPvpAndPvePts(response.data);
      }
    }

    async function getActiveEvent() {
      const response = await get("/api/v1/stats/active-event", headers);
      if (response.status === 200) {
        setActiveEvent(response.data);
      }
    }

    getPveAndPvpMaxPts();
    getActiveEvent();
  }, []);

  return (
    <div className="profileNavbar">
      <div className="profileNavbar--labels">
        <div>
          <img className="me-2" src={require(`../../../img/utilities/gold.webp`)} />
          {gold && <label>{gold.toLocaleString()}</label>}
        </div>
        <div>
          <img className="me-2" src={require(`../../../img/utilities/diamond.webp`)} />
          {diamond && <label>{diamond.toLocaleString()}</label>}
        </div>
      </div>
      {pvpAndPvePts.maxPvePts && pvePts >= 0 && (
        <div className="navBarDivs">
          <label>
            PvE Pts: {pvePts}/{pvpAndPvePts.maxPvePts}
          </label>
        </div>
      )}
      {pvpAndPvePts.maxPvpPts && pvpPts >= 0 && (
        <div className="navBarDivs">
          <label>
            PvP Pts: {pvpPts}/{pvpAndPvePts.maxPvpPts}
          </label>
        </div>
      )}
      <div className="navBarDivs">
        {activeEvent &&
          (activeEvent.eventName === "NONE" ? (
            <label>No active events</label>
          ) : (
            <label>Event: {activeEvent.eventName}</label>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
