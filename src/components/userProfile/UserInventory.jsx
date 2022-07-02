import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const UserInventory = ({ inventory, equipment }) => {
  console.log(equipment);
  console.log(inventory);
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
    const equipedItem = equipment.items;
    for (let i = 0; i < equipedItem.length; i++) {
      const divGeneric = document.getElementById(equipedItem[i].type);

      if (!divGeneric.hasChildNodes()) {
        const divItemEquiped = document.createElement("div");
        const imgItemEquiped = document.createElement("img");
        const pItemEquiped = document.createElement("p");

        divItemEquiped.setAttribute("draggable", true);
        divItemEquiped.setAttribute("id", equipedItem[i].id);
        divItemEquiped.ondragstart = () => {
          setDataItem({
            name: equipedItem[i].name,
            id: equipedItem[i].id,
            type: equipedItem[i].type,
          });
        };
        divItemEquiped.classList.add("divItems");

        pItemEquiped.innerHTML = equipedItem[i].amount;

        imgItemEquiped.setAttribute(
          "src",
          require(`../img/items/${equipedItem[i].type}.png`)
        );
        imgItemEquiped.classList.add("item");

        divItemEquiped.appendChild(imgItemEquiped);
        divItemEquiped.appendChild(pItemEquiped);
        divGeneric.appendChild(divItemEquiped);
      }
    }
  };

  async function handleItem(toEquip) {
    let data = { id: dataItem.id };
    let equip = toEquip === true ? "equip-item" : "unequip-item";

    await axios
      .post("https://ao-web.herokuapp.com/api/v1/users/" + equip, data, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.request.status === 409) {
          window.location.reload();
        }
      });
  }

  const dropEquiped = () => {
    const divGeneric = document.getElementById(dataItem.type);

    if (!divGeneric.hasChildNodes()) {
      divGeneric.appendChild(itemSelect);
    }
    handleItem(true);
  };

  const dropBox = () => {
    invBox.appendChild(itemSelect);
    handleItem(false);
  };

  {
    equipment && equipmentCreate();
  }

  return (
    <div className="inventory" id="inventory">
      <h3>Inventory</h3>
      <div
        className="inventory--equiped"
        id="inventory--equiped"
        onDragOver={dragOver}
        onDrop={dropEquiped}
      >
        <div id="ship"></div>
        <div id="helmet"></div>
        <div id="wings"></div>
        <div id="weapon"></div>
        <div id="armor"></div>
        <div id="shield"></div>
        <div id="gloves"></div>
        <div id="pants"></div>
        <div id="boots"></div>
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
              className="divItems"
              onDragStart={() => {
                setDataItem({
                  name: item.name,
                  id: item.id,
                  type: item.type,
                });
              }}
            >
              <img
                src={require(`../img/items/${item.type}.png`)}
                className="item"
                alt=""
              />
              <p>{item.amount}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserInventory;
