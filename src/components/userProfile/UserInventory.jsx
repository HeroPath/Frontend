import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../utilities.js";

const UserInventory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let [inventoryEquiped, setInventoryEquiped] = useState([
    { name: "ring", id: 25 },
    { name: "hat", id: 26 },
  ]);
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
    { name: "shield", id: 20 },
    { name: "ring", id: 21 },
    { name: "hat", id: 22 },
    { name: "staff", id: 23 },
    { name: "daga", id: 24 },
  ];
  let i = 1;
  let j = 1;

  /* ----------------------------------- DRAG AND DROP --------------------------------------*/

  let idItemBox = "10";
  let idItemEquiped = "10";
  // let idItemBox = location.state.itemId;
  // let idItemEquiped = location.state.itemId;

  const invEquiped = document.getElementById("inventory--equiped");
  const itemBox = document.getElementById(idItemBox);

  const invBox = document.getElementById("inventory--box");
  const itemEquiped = document.getElementById(idItemEquiped);
  /* ----------------------------------- DRAG --------------------------------------*/
  /* ----------------------------------- //DRAG--------------------------------------*/

  /* ----------------------------------- DROP --------------------------------------*/
  const dragOver = (e) => {
    e.preventDefault();
  };
  const dropEquiped = (e) => {
    e.preventDefault();
    invEquiped.appendChild(itemBox);
  };
  const dropBox = (e) => {
    e.preventDefault();
    invBox.appendChild(itemEquiped);
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
          <div draggable="true" key={j++} id={items.id}>
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
          <div draggable="true" key={items.id} id={items.id} className="invBox">
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
