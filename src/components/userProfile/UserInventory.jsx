import React, { useEffect, useState } from "react";

import "../utilities.js";

const UserInventory = ({ inventory, equipment }) => {
  let [dataItem, setDataItem] = useState({});
  const invBox = document.getElementById("inventory--box");
  const itemSelect = document.getElementById(dataItem.id);

  const dragOver = (e) => {
    e.preventDefault();
  };

  const testing = () => {
    const res = equipment.items;
    for (let i = 0; i < res.length; i++) {
      const divGeneric = document.getElementById(res[i].type);

      if (!divGeneric.hasChildNodes()) {
        const divItemEquiped = document.createElement("div");
        const imgItemEquiped = document.createElement("img");
        divItemEquiped.setAttribute("draggable", true);
        divItemEquiped.setAttribute("id", res[i].id);

        divItemEquiped.ondragstart = function dragItemEquiped() {
          setDataItem({
            name: res[i].name,
            id: res[i].id,
            type: res[i].type,
          });
        };

        imgItemEquiped.setAttribute(
          "src",
          require(`../img/items/${res[i].type}.png`)
        );
        imgItemEquiped.classList.add("item");

        divItemEquiped.appendChild(imgItemEquiped);
        divGeneric.appendChild(divItemEquiped);
      }
    }
  };

  // {
  //   equipment && testing();
  // }

  useEffect(() => {}, []);

  const dropEquiped = () => {
    const divGenericEquiped = document.getElementById(dataItem.type);

    if (
      divGenericEquiped.id === dataItem.type &&
      !divGenericEquiped.hasChildNodes()
    ) {
      divGenericEquiped.appendChild(itemSelect);
    }
  };

  const dropBox = (e) => {
    e.preventDefault();
    invBox.appendChild(itemSelect);
  };

  return (
    <div className="inventory" id="inventory">
      <h3>Inventory</h3>
      <div
        className="inventory--equiped"
        id="inventory--equiped"
        onDragOver={dragOver}
        onDrop={dropEquiped}
        onClick={testing}
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserInventory;
