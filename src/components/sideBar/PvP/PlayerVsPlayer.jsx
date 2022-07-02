import React from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const PlayerVsPlayer = () => {
  const cookies = new Cookies();
  const headers = {
    Authorization: "Bearer " + cookies.get("token"),
  };

  const [userAttack, setUserAttack] = React.useState("");

  function handleChange(e) {
    const userName = e.target.value;

    setUserAttack(userName);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await axios
      .post(
        "https://ao-web.herokuapp.com/api/v1/users/attack-user",
        { name: userAttack },
        { headers }
      )
      .then((response) => {
        if (response.status === 200) {
          // navigate("/profile");
          console.log(response.data);
        }
      });
  }

  return (
    <form onSubmit={handleSubmit} className="pvpbattle">
      <label>Usuario al que queres atacar</label>
      <input type="text" placeholder="Username" onChange={handleChange} />
      <button type="submit">ATACAR</button>
    </form>
  );
};

export default PlayerVsPlayer;
