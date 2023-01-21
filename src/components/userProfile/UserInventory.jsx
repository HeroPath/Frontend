import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import env from "react-dotenv";

const UserInventory = ({
  inventory,
  equipment,
  aclass,
  itemBuy,
  nameItemBuy,
  level,
}) => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };
  const [dataItem, setDataItem] = useState({});

  const invBox = document.getElementById("inventory--box");
  const itemSelect = document.getElementById(dataItem.id);

  const dragOver = (e) => {
    e.preventDefault();
  };

  const equipmentCreate = () => {
    const eItem = equipment.items;
    for (let i = 0; i < eItem.length; i++) {
      const divGeneric = document.getElementById(eItem[i].type);

      if (!divGeneric.hasChildNodes()) {
        const divItemEquiped = document.createElement("div");
        const imgItemEquiped = document.createElement("img");

        divItemEquiped.setAttribute("draggable", true);
        divItemEquiped.setAttribute("id", eItem[i].id);
        divItemEquiped.setAttribute(
          "data-tooltip",
          `Name: ${eItem[i].name}
        Strength: ${eItem[i].strength}
        Dexterity: ${eItem[i].dexterity}
        Vitality: ${eItem[i].vitality}
        Intelligence: ${eItem[i].intelligence}
        Level Min: ${eItem[i].lvlMin}
        Class: ${eItem[i].classRequired}
              
        Price: ${eItem[i].price / 2}
        `
        );

        divItemEquiped.ondragstart = () => {
          setDataItem({
            name: eItem[i].name,
            id: eItem[i].id,
            type: eItem[i].type,
          });
        };
        divItemEquiped.classList.add("divItems");

        imgItemEquiped.setAttribute(
          "src",
          require(`../img/items/${eItem[i].name}.png`)
        );
        imgItemEquiped.classList.add("item");

        divItemEquiped.appendChild(imgItemEquiped);
        divGeneric.appendChild(divItemEquiped);
      }
    }
  };

  async function handleItem(toEquip) {
    let data = { id: dataItem.id };
    let equip = toEquip === true ? "equip" : "unequip";

    await axios
      .post(env.API_URL + "/api/v1/items/" + equip, data, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.request.status === 409) {
          notify(err.response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, [2500]);
        }
      });
  }

  async function handleItemBuy() {
    const data = { name: nameItemBuy };
    await axios
      .post(env.API_URL + "/api/v1/items/buy", data, {
        headers,
      })
      .then(async (response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.request.status === 409) {
          notify(err.response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, [2500]);
        }
      });
  }

  const dropEquiped = () => {
    const divGeneric = document.getElementById(dataItem.type);
    if (dataItem.type !== "potion") {
      if (!divGeneric.hasChildNodes()) {
        divGeneric.appendChild(itemSelect);
      }
    }
    handleItem(true);
  };

  const dropBox = () => {
    if (itemSelect !== null) {
      invBox.appendChild(itemSelect);
      handleItem(false);
    } else if (itemBuy !== null) {
      invBox.appendChild(itemBuy);
      handleItemBuy();
    }
  };

  {
    equipment && equipmentCreate();
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
    <div className="inventory" id="inventory">
      <h3>Inventory</h3>
      <div
        className="inventory--equiped"
        id="inventory--equiped"
        onDragOver={dragOver}
        onDrop={dropEquiped}
      >
        <div id="ship" />
        <div id="helmet" />
        <div id="wings" />
        <div id="weapon" />
        <div id="armor" />
        <div id="shield" />
        <div id="gloves" />
        <div id="pants" />
        <div id="boots" />
      </div>
      <div
        className="inventory--box"
        id="inventory--box"
        onDragOver={dragOver}
        onDrop={dropBox}
      >
        {inventory &&
          inventory.items.map((item) => (
            <div
              draggable="true"
              key={item.id}
              id={item.id}
              style={{
                display: "flex",
                maxWidth: "35px",
                maxHeight: "35px",
                marginLeft: "1px",
              }}
              className={
                item.classRequired !== aclass.name &&
                item.classRequired !== "none"
                  ? "itemNoClass"
                  : item.lvlMin > level
                  ? "itemNoLevel"
                  : ""
              }
              onDragStart={() => {
                setDataItem({
                  name: item.name,
                  id: item.id,
                  type: item.type,
                });
              }}
              data-tooltip={`Name: ${item.name}
              Strength: ${item.strength}
              Dexterity: ${item.dexterity}
              Vitality: ${item.vitality}
              Intelligence: ${item.intelligence}
              Level Min: ${item.lvlMin}
              Class: ${item.classRequired}
              
              Price: ${item.price / 2}`}
            >
              <img
                src={require(`../img/items/${item.name}.png`)}
                className="item"
                alt=""
              />
              <p
                style={{
                  color: "white",
                  fontSize: "9px",
                  marginTop: "1px",
                  marginLeft: "-2px",
                }}
              >
                {item.amount}
              </p>
            </div>
          ))}
      </div>

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

export default UserInventory;
