import React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlayerVsNPC = () => {
  const cookies = new Cookies();
  const headers = {
    Authorization: "Bearer " + cookies.get("token"),
  };

  const navigate = useNavigate();

  return (
    <div>
      <button
        className="btn btn-dark m-2"
        type="submit"
        onClick={async () => {
          const data = { npcId: 1 };

          await axios
            .post(
              "https://ao-web.herokuapp.com/api/v1/users/attack-npc",
              data,
              {
                headers,
              }
            )
            .then((response) => {
              if (response.status === 200) {
                navigate("/profile");
              }
            });
        }}
      >
        Murcielago
      </button>
    </div>
  );
};

export default PlayerVsNPC;
