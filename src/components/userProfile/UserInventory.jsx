import React, { useState } from "react";

import "../utilities.js";

const UserInventory = () => {
  let inventoryEquiped = [
    { name: "ring", id: 30 },
    { name: "hat", id: 31 },
  ];
  let inventoryBox = [
    { name: "ring", id: 1 },
    { name: "hat", id: 2 },
    { name: "staff", id: 3 },
    { name: "daga", id: 4 },
    { name: "shield", id: 5 },
    { name: "ring", id: 6 },
    { name: "hat", id: 7 },
    { name: "staff", id: 8 },
    { name: "daga", id: 9 },
    { name: "shield", id: 10 },
    { name: "ring", id: 11 },
    { name: "hat", id: 12 },
    { name: "staff", id: 13 },
    { name: "daga", id: 14 },
    { name: "shield", id: 15 },
    { name: "ring", id: 16 },
    { name: "hat", id: 17 },
    { name: "staff", id: 18 },
    { name: "daga", id: 19 },
  ];

  let j = 1;

  /* ----------------------------------- DRAG AND DROP --------------------------------------*/

  let [dataItemBox, setDataItemBox] = useState({});
  let [dataItemEquiped, setDataItemEquiped] = useState({});

  const invEquiped = document.getElementById("inventory--equiped");
  const itemBox = document.getElementById(dataItemBox.id);

  const invBox = document.getElementById("inventory--box");
  const itemEquiped = document.getElementById(dataItemEquiped.id);

  /* ----------------------------------- DRAG --------------------------------------*/
  /* ----------------------------------- //DRAG--------------------------------------*/

  /* ----------------------------------- DROP --------------------------------------*/
  const dragOver = (e) => {
    e.preventDefault();
  };
  const dropEquiped = () => {

    invEquiped.appendChild(itemBox);
    inventoryEquiped.push(dataItemBox);
    inventoryBox.slice(dataItemBox);

    console.log(inventoryEquiped);
  };
  const dropBox = (e) => {
    e.preventDefault();

    invBox.appendChild(itemEquiped);

    inventoryBox.push(dataItemEquiped);
    inventoryEquiped.splice(dataItemEquiped);

    console.log(inventoryBox);
  };
  /* ----------------------------------- //DROP --------------------------------------*/

  /* ----------------------------------- //DRAG AND DROP --------------------------------------*/

  return (
    <div className="inventory" id="inventory">
      <h4>Inventory</h4>
      <div
        className="inventory--equiped"
        id="inventory--equiped"
        onDragOver={dragOver}
        onDrop={dropEquiped}
      >
        {inventoryEquiped?.map((items) => (
          <div
            draggable="true"
            key={j++}
            id={items.id}
            className="invEquiped"
            onDrag={() => {
              setDataItemEquiped({ name: items.name, id: items.id });
            }}
          >
            <img
              src={require(`../img/items/${items.name}.png`)}
              className="item itemEquiped"
              alt=""
            />
          </div>
        ))}
      </div>
      <div
        className="inventory--box"
        id="inventory--box"
        onDragOver={dragOver}
        onDrop={dropBox}
      >
        {inventoryBox?.map((items) => (
          <div
            draggable="true"
            key={items.id}
            id={items.id}
            className="invBox"
            onDrag={() => {
              setDataItemBox({ name: items.name, id: items.id });
            }}
          >
            <img
              src={require(`../img/items/${items.name}.png`)}
              className="item itemBox"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInventory;

// const item = {
//   backgroundImage: `url("../img/items/daga.png")`,
//   width: "32px",
//   height: "32px",
//   marginTop: "3px",
//   marginLeft: "5px",
// };
