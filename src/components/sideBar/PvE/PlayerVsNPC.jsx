import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import env from "react-dotenv";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      .get(env.API_URL + "/api/v1/npcs/zone/" + location.state.name, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          setNpcData(response.data);
        }
      });
  }

  useEffect(() => {
    handleData();
  }, []);

  const notify = (alert) => {
    toast.error(alert, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="npcCards">
      {npcData?.map((npc) => (
        <form key={npc.id} className="npcCards--form">
          <h5>
            {npc.name.replace(/(^\w{1})/g, (letter) => letter.toUpperCase())}
          </h5>
          <div>
            <img
              src={require("../../img/npc/squirtle.jpg")}
              width="200px"
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
                  env.API_URL + "/api/v1/users/attack-npc",
                  { name: npc.name },
                  {
                    headers,
                  }
                )
                .then((response) => {
                  if (response.status === 200) {
                    response.data = Object.assign(response.data, {
                      nameData: npc.name,
                    });
                    navigate("/pvebattle", {
                      state: { battleData: response.data },
                    });
                  }
                })
                .catch((err) => {
                  if (err.request.status === 409) {
                    notify(err.response.data.message);
                  }
                });
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
          <h6>
            Recommended level: {npc.level}-{npc.level + 3}
          </h6>
        </form>
      ))}
    </div>
  );
};

export default PlayerVsNPC;
