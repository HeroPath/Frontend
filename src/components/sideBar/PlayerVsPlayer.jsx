import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlayerVsPlayer = () => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

  return (
    <div>
      <button
        className="btn btn-dark m-2 p-2"
        type="submit"
        onClick={async (e) => {
          e.preventDefault();
          await axios
            .post(
              "https://ao-web.herokuapp.com/api/v1/users/attack-user/",
              "test5",
              {
                headers,
              }
            )
            .then((response) => {
              if (response.status === 200) {
                // navigate("/profile");
                console.log(response.data);
              }
            });
        }}
      >
        Fight
      </button>
    </div>
  );
};

export default PlayerVsPlayer;
