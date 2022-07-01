import React, { useEffect, useState } from "react";

import "../utilities.js";

const UserInventory = ({ inventory, equipment }) => {
  let [dataItemBox, setDataItemBox] = useState({});
  let [dataItemEquiped, setDataItemEquiped] = useState({});
  const itemBox = document.getElementById(dataItemBox.id);
  const invBox = document.getElementById("inventory--box");
  const itemEquiped = document.getElementById(dataItemEquiped.id);

  const dragOver = (e) => {
    e.preventDefault();
  };

  const testing = () => {
    for (let i = 0; i < equipment.items.length; i++) {
      let divGeneric = document.getElementById(equipment.items[i].type);

      if (!divGeneric.hasChildNodes()) {
        const divItemEquiped = document.createElement("div");
        const imgItemEquiped = document.createElement("img");
        divItemEquiped.setAttribute("draggable", true);
        divItemEquiped.setAttribute("id", equipment.items[i].id);

        divItemEquiped.ondragstart = function dragItemEquiped() {
          setDataItemEquiped({
            name: equipment.items[i].name,
            id: equipment.items[i].id,
            type: equipment.items[i].type,
          });
        };

        divItemEquiped.classList.add("item");

        imgItemEquiped.setAttribute(
          "src",
          require(`../img/items/${equipment.items[i].type}.png`)
        );
        imgItemEquiped.classList.add("item", "itemEquiped");

        divItemEquiped.appendChild(imgItemEquiped);
        divGeneric.appendChild(divItemEquiped);
      }
    }
  };

  const dropEquiped = () => {
    const divGenericEquiped = document.getElementById(dataItemBox.type);

    if (
      divGenericEquiped.id === dataItemBox.type &&
      !divGenericEquiped.hasChildNodes()
    ) {
      divGenericEquiped.appendChild(itemBox);
    }
  };
  const dropBox = (e) => {
    e.preventDefault();
    invBox.appendChild(itemEquiped);
  };

  return (
    <div className="inventory" id="inventory">
      <h4>Inventory</h4>
      <div
        className="inventory--equiped"
        id="inventory--equiped"
        onDragOver={dragOver}
        onDrop={dropEquiped}
        onClick={testing}
      >
        <div id="ship" className="divEquiped"></div>
        <div id="helmet" className="divEquiped"></div>
        <div id="wings" className="divEquiped"></div>
        <div id="weapon" className="divEquiped"></div>
        <div id="armor" className="divEquiped"></div>
        <div id="shield" className="divEquiped"></div>
        <div id="gloves" className="divEquiped"></div>
        <div id="pants" className="divEquiped"></div>
        <div id="boots" className="divEquiped"></div>
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
              className="invBox"
              onDragStart={() => {
                setDataItemBox({
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserInventory;
