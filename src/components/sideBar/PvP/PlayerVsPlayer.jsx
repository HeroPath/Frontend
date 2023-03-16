import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { headers } from "../../../functions/utilities";
import { post } from "../../../functions/requestsApi";

const PlayerVsPlayer = () => {
  const [userAttack, setUserAttack] = useState("");

  function handleChange(e) {
    const userName = e.target.value;
    setUserAttack(userName);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await post(
      "/api/v1/users/attack-user",
      { name: userAttack },
      headers
    );
    if (response.status === 200) console.log(response.data); //window.location.reload();
  }

  return (
    <div className="pvpbattle">
      <form onSubmit={handleSubmit}>
        <Card className="text-center">
          <Card.Header>Pvp User Vs User</Card.Header>
          <Card.Body>
            <Card.Title>
              Ingresa el nombre del usuario que deseas atacar
            </Card.Title>
            <Card.Text>
              <input
                type="text"
                placeholder="Username"
                style={{ textAlign: "center" }}
                onChange={handleChange}
              />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" type="submit">
              Attack
            </Button>
          </Card.Footer>
        </Card>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={2000}
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

export default PlayerVsPlayer;
