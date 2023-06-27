"use client";

import { useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import "../zone/pve.css";

const PveBattle = () => {
  const battleData = useSelector((state) => state.Slice.battleData);

  console.log(battleData); 

  return <div>page</div>;
};

export default PveBattle;
