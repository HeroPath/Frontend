"use client";
import { Fragment, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import "./itemTooltip.css";
import Image from "next/image";

const ItemTooltip = ({ item }) => {
  const { name, quality, itemLevel, strength, dexterity, intelligence, vitality, luck, lvlMin, classRequired, price } =
    useMemo(() => item, [item]);

  return (
    <Tooltip
      title={
        <Fragment>
          <div className="tooltipClass">
            <Typography className="itemTooltip--name mb-2">
              <label style={{ color: `${quality}` }}>{name}</label>
              <span>{itemLevel >= 1 ? ` +${itemLevel}` : ""}</span>
            </Typography>
            <div className="itemTooltip--stats">
              {strength > 0 && (
                <div className="tooltipStat">
                  <label>Strength:</label>
                  <span>{strength}</span>
                </div>
              )}
              {dexterity > 0 && (
                <div className="tooltipStat">
                  <label>Dexterity:</label>
                  <span>{dexterity}</span>
                </div>
              )}
              {intelligence > 0 && (
                <div className="tooltipStat">
                  <label>Intelligence:</label>
                  <span>{intelligence}</span>
                </div>
              )}
              {vitality > 0 && (
                <div className="tooltipStat">
                  <label>Vitality:</label>
                  <span>{vitality}</span>
                </div>
              )}
              {luck > 0 && (
                <div className="tooltipStat">
                  <label>Luck:</label>
                  <span>{luck}</span>
                </div>
              )}
              <div className="tooltipStat mt-1">
                <label>Level Req:</label>
                <span>{lvlMin}</span>
              </div>
              <div className="tooltipStat">
                <label>Class:</label>
                <span>{classRequired === "none" ? "All" : classRequired}</span>
              </div>
              <div className="tooltipStat mt-2">
                <label>Price:</label>
                <span>{price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Fragment>
      }
      placement="top"
      followCursor
      disableInteractive
    >
      <Image src={require(`@/public/img/items/${classRequired}/${name}.png`)} className="item" alt="tooltip" />
    </Tooltip>
  );
};

export default ItemTooltip;
