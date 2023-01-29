import React, { useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { post } from "../../functions/requestsApi";
import { headers } from "../../functions/utilities";

const UserInventory = ({
  inventory,
  equipment,
  aclass,
  itemBuy,
  nameItemBuy,
  level,
}) => {
  const [dataItem, setDataItem] = useState({});
  const [equipDrag, setEquipDrag] = useState(false);

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
          setEquipDrag(true);
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

    const response = await post("/api/v1/items/" + equip, data, headers);
    if (response.status === 200) window.location.reload();
  }

  async function handleItemBuy() {
    const data = { name: nameItemBuy };

    const response = await post("/api/v1/items/buy", data, headers);
    if (response.status === 200) window.location.reload();
  }

  const dropEquiped = () => {
    handleItem(true);
  };

  const dropBox = () => {
    if (equipDrag === true) {
      handleItem(false);
    }
    if (itemBuy !== null) {
      handleItemBuy();
    }
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
          inventory.items.map((item, index) => (
            <div
              draggable="true"
              key={index}
              id={item.id}
              style={{
                display: "flex",
                maxWidth: "36px",
                maxHeight: "36px",
                marginLeft: "3px",
                marginTop: "2px",
              }}
              className={
                item.classRequired !== aclass.name &&
                item.classRequired !== "none"
                  ? "itemNoClass"
                  : item.lvlMin > level
                  ? "itemNoLevel"
                  : ""
              }
              onDragStart={(event) => {
                event.dataTransfer.setData("nameItemSell", item.name);
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
