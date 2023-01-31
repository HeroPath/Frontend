import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { headers } from "../../../functions/utilities";
import { get, post } from "../../../functions/requestsApi";

const PlayerVsNPC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [npcData, setNpcData] = React.useState([]);

  async function handleData() {
    const response = await get(
      "/api/v1/npcs/zone/" + location.state.name,
      headers
    );
    if (response.status === 200) setNpcData(response.data);
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div
      className="npcCards"
      style={{
        backgroundImage: `url(${require("../../img/zone/bg-" +
          location.state.name +
          ".webp")})`,
      }}
    >
      {npcData?.map((npc) => (
        <form key={npc.id} className="npcCards--form">
          <div className="npcName">
            <h4>
              {npc.name.replace(/(^\w{1})/g, (letter) => letter.toUpperCase())}
            </h4>
            {npc.level < 6 ? (
              <h6>Min Level: 1</h6>
            ) : (
              <h6>Min Level: {npc.level - 5}</h6>
            )}
          </div>
          <div className="npcImg">
            <img
              src={require(`../../img/npc/${npc.name}.webp`)}
              width="190px"
              height="190px"
            />
          </div>
          <button
            type="submit"
            onClick={async (e) => {
              e.preventDefault();

              const response = await post(
                "/api/v1/users/attack-npc",
                { name: npc.name },
                headers
              );
              if (response.status === 200) {
                response.data = Object.assign(response.data, {
                  nameData: npc.name,
                });
                navigate("/pvebattle", {
                  state: { battleData: response.data },
                });
              }
            }}
          >
            Fight
          </button>
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
        </form>
      ))}
    </div>
  );
};

export default PlayerVsNPC;
