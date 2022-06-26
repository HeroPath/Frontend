import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const PlayerVsNPC = () => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

  const location = useLocation();
  const navigate = useNavigate();

  const [npcData, setNpcData] = React.useState([]);

  async function handleData() {
    await axios
      .get(
        "https://ao-web.herokuapp.com/api/v1/npcs/zone/" + location.state.name,
        { headers }
      )
      .then((response) => {
        if (response.status === 200) {
          setNpcData(response.data);
        }
      });
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="npcCards">
      {npcData?.map((npc) => (
        <form key={npc.id} className="npcCards--form">
          <h5>
            {npc.name.replace(/(^\w{1})/g, (letter) => letter.toUpperCase())}
          </h5>
          <div>
            <img
              src={require("../img/npc/murcielago.png")}
              width="108px"
              height="206px"
              alt=""
            />
          </div>
          <button
            className="btn btn-dark m-2 p-2"
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              await axios
                .post(
                  "https://ao-web.herokuapp.com/api/v1/users/attack-npc/",
                  npc.name,
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
            Fight
          </button>
          <h6>
            Recommended level: {npc.level} - {npc.level + 3}
          </h6>
        </form>
      ))}
    </div>
  );
};

export default PlayerVsNPC;
