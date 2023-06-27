"use client";
import React from "react";
import { zoneMap } from "@/functions/constants";
import Link from "next/link";
import "./pve.css";

const page = () => {
  return (
    <div className="zone">
      {zoneMap.map((zone, index) => (
        <div className="zoneCard" key={index}>
          <h4>{zone.name}</h4>
          <form
            key={index}
            className="zoneForm"
            style={{
              backgroundImage: `url(${require("../../public/img/zone/" + zone.name + ".webp")})`,
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
            <Link
              className="button--links links buttons-zone"
              href={{
                pathname: "/playervsnpc",
                query: { name: zone.name },
              }}
            >
              Travel
            </Link>
          </form>
          <p>
            Recommended lvl: {zone.rLvlMin} / {zone.rLvlMax}
          </p>
        </div>
      ))}
    </div>
  );
};

export default page;
