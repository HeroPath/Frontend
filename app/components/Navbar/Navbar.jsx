import Image from "next/image";
import { useEffect } from "react";
import "./navbar.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchEvent, fetchPveAndPvpMaxPts } from "@/store/slice";

import GoldIcon from "@/public/img/utilities/gold.webp";
import DiamondIcon from "@/public/img/utilities/diamond.webp";

const Navbar = ({ gold, diamond, pvePts, pvpPts }) => {
  const dispatch = useDispatch();

  const activeEvent = useSelector((state) => state.Slice.activeEvent);
  const pvpAndPvePts = useSelector((state) => state.Slice.pvpAndPvePts);

  useEffect(() => {
    dispatch(fetchPveAndPvpMaxPts());
    dispatch(fetchEvent());
  }, []);

  return (
    <div className="profileNavbar">
      <div className="profileNavbar--labels">
        <div>
          <Image src={GoldIcon} alt="gold" className="me-2" />
          {gold && <label>{gold.toLocaleString()}</label>}
        </div>
        <div>
          <Image src={DiamondIcon} alt="diamond" className="me-2" />
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
