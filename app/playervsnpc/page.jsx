"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchNpcAttack, handleNpcAttack } from "@/store/slice";
import "react-toastify/dist/ReactToastify.css";
import "../zone/pve.css";

const PlayerVsNPC = ({ searchParams }) => {
  const dispatch = useDispatch();
  const npcData = useSelector((state) => state.Slice.npcAttacked);

  function attackNpc(npcName) {
    dispatch(handleNpcAttack(npcName));
  }

  useEffect(() => {
    dispatch(fetchNpcAttack(searchParams.name));
  }, [dispatch, searchParams.name]);

  return (
    <div
      className="npcCards"
      style={{
        backgroundImage: `url(/img/zone/bg-${searchParams.name}.webp)`,
      }}
    >
      {npcData?.map((npc) => (
        <form key={npc.id} className="npcCards--form">
          <div className="npcName">
            <h4>{npc.name}</h4>
            {npc.level < 6 ? <h6>Min Level: 1</h6> : <h6>Min Level: {npc.level - 5}</h6>}
          </div>
          <div className="npcImg">
            <Image src={require(`@/public/img/npc/${npc.name}.webp`)} width={190} height={190} alt="Npc" />
          </div>
          <button
            type="submit"
            onClick={() => {
              attackNpc(npc.name);
            }}
          >
            Fight
          </button>
        </form>
      ))}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default PlayerVsNPC;
