import React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import env from "react-dotenv";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        env.API_URL + "/api/v1/users/attack-user",
        { name: userAttack },
        { headers }
      )
      .then((response) => {
        if (response.status === 200) {
          //window.location.reload();
          console.log(response.data);
        }
      })
      .catch((err) => {
        if (err.request.status !== 0) {
          notify(err.response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, [2500]);
        }
      });
  }

  const notify = (alert) => {
    toast.error(alert, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="pvpbattle">
      <form onSubmit={handleSubmit} >
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
                style={{textAlign: "center"}}
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
