import React, { useEffect, useState } from "react";

import "../utilities.js";

const UserInventory = ({ inventory, equipment }) => {
  /* ----------------------------------- DRAG AND DROP --------------------------------------*/

  let [dataItemBox, setDataItemBox] = useState({});
  let [dataItemEquiped, setDataItemEquiped] = useState({});

  // const invEquiped = document.getElementById("inventory--equiped");
  const itemBox = document.getElementById(dataItemBox.id);

  const invBox = document.getElementById("inventory--box");
  const itemEquiped = document.getElementById(dataItemEquiped.id);

  /* ----------------------------------- DRAG --------------------------------------*/
  /* ----------------------------------- //DRAG--------------------------------------*/

  const divShip = document.getElementById("ship");
  const divHelmet = document.getElementById("helmet");
  const divWings = document.getElementById("wings");
  const divWeapon = document.getElementById("weapon");
  const divArmor = document.getElementById("armor");
  const divShield = document.getElementById("shield");
  const divGloves = document.getElementById("gloves");
  const divPants = document.getElementById("pants");
  const divBoots = document.getElementById("boots");

  /* ----------------------------------- DROP --------------------------------------*/
  const dragOver = (e) => {
    e.preventDefault();
  };

  if (equipment) {
    equipment.items.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  console.log(equipment);

  const testing = () => {
    for (let i = 0; i < equipment.items.length; i++) {
      let divGeneric = document.getElementById(equipment.items[i].type);

      if (
        divGeneric.id === equipment.items[i].type &&
        !divGeneric.hasChildNodes()
      ) {
        const divItemEquiped = document.createElement("div");
        const imgItemEquiped = document.createElement("img");
        divItemEquiped.setAttribute("id", equipment.items[i].id);
        divItemEquiped.setAttribute("draggable", true);

        divItemEquiped.ondrag = function draggg() {
          setDataItemEquiped({
            name: equipment.items[i].name,
            id: equipment.items[i].id,
            type: equipment.items[i].type,
          });
        };

        divItemEquiped.classList.add("invEquiped");

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
    if (divShip.id === dataItemBox.type && !divShip.hasChildNodes()) {
      divShip.appendChild(itemBox);
    } else if (
      divShield.id === dataItemBox.type &&
      !divShield.hasChildNodes()
    ) {
      divShield.appendChild(itemBox);
    } else if (
      divHelmet.id === dataItemBox.type &&
      !divHelmet.hasChildNodes()
    ) {
      divHelmet.appendChild(itemBox);
    } else if (divWings.id === dataItemBox.type && !divWings.hasChildNodes()) {
      divWings.appendChild(itemBox);
    } else if (
      divWeapon.id === dataItemBox.type &&
      !divWeapon.hasChildNodes()
    ) {
      divWeapon.appendChild(itemBox);
    } else if (divArmor.id === dataItemBox.type && !divArmor.hasChildNodes()) {
      divArmor.appendChild(itemBox);
    } else if (divBoots.id === dataItemBox.type && !divBoots.hasChildNodes()) {
      divBoots.appendChild(itemBox);
    } else if (
      divGloves.id === dataItemBox.type &&
      !divGloves.hasChildNodes()
    ) {
      divGloves.appendChild(itemBox);
    } else if (divPants.id === dataItemBox.type && !divPants.hasChildNodes()) {
      divPants.appendChild(itemBox);
    } else if (divBoots.id === dataItemBox.type && !divBoots.hasChildNodes()) {
      divBoots.appendChild(itemBox);
    }

    /* Post a la api para cargar el item que equipamos */
  };
  const dropBox = (e) => {
    e.preventDefault();

    invBox.appendChild(itemEquiped);

    /* Post a la api para cargar el item que desequipamos */
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
              onDrag={() => {
                setDataItemBox({
                  name: item.name,
                  id: item.id,
                  type: item.type,
                });
              }}
            >
              <img
                src={require(`../img/items/${item.type}.png`)}
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
