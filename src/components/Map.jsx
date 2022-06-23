import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const Map = () => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };

  const [npcData, setNpcData] = React.useState([]);

  async function handleData() {
    await axios
      .get("https://ao-web.herokuapp.com/api/v1/npcs", { headers })
      .then((response) => {
        if (response.status === 200) {
          setNpcData(response.data);
          console.log(response.data);
        }
      });
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div style={{ width: "100vw" }}>
      <button className="btn btn-dark m-3" type="submit">
        <a href="/playervsnpc" className="links">
          npc
        </a>
      </button>
    </div>
  );
};

export default Map;
