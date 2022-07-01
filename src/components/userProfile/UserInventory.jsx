import React, { useEffect, useState } from "react";

import "../utilities.js";

const UserInventory = ({ inventory, equipment }) => {
  /* ----------------------------------- DRAG AND DROP --------------------------------------*/

  let [dataItemBox, setDataItemBox] = useState({});
  let [dataItemEquiped, setDataItemEquiped] = useState({});

  const invEquiped = document.getElementById("inventory--equiped");
  const itemBox = document.getElementById(dataItemBox.id);

  const invBox = document.getElementById("inventory--box");
  const itemEquiped = document.getElementById(dataItemEquiped.id);

  /* ----------------------------------- DRAG --------------------------------------*/
  /* ----------------------------------- //DRAG--------------------------------------*/

  const divRing = document.getElementById("ring");
  const divHelmet = document.getElementById("helmet");
  const divWings = document.getElementById("wings");
  const divSword = document.getElementById("sword");
  const divArmor = document.getElementById("armor");
  const divShield = document.getElementById("shield");
  const divGloves = document.getElementById("gloves");
  const divPants = document.getElementById("pants");
  const divBoots = document.getElementById("boots");

  const equipo = {
    id: 1,
    items: [
      { id: 1, name: "daga", type: "gloves" },
      { id: 2, name: "shield", type: "pants" },
      { id: 3, name: "ring", type: "boots" },
    ],
  };

  // if (divGloves) {
  //   if (divGloves.id === equipo.items[0].type && !divGloves.hasChildNodes()) {
  //     const divItemEquiped = document.createElement("div");
  //     const imgItemEquiped = document.createElement("img");
  //     divItemEquiped.setAttribute("id", equipo.items[0].id);
  //     divItemEquiped.setAttribute("draggable", true);

  //     divItemEquiped.ondrag = function draggg() {
  //       setDataItemEquiped({
  //         name: equipo.items[0].name,
  //         id: equipo.items[0].id,
  //         type: equipo.items[0].type,
  //       });
  //     };

  //     divItemEquiped.classList.add("invEquiped");

  //     imgItemEquiped.setAttribute(
  //       "src",
  //       require(`../img/items/${equipo.items[0].name}.png`)
  //     );
  //     imgItemEquiped.classList.add("item", "itemEquiped");

  //     divItemEquiped.appendChild(imgItemEquiped);
  //     divGloves.appendChild(divItemEquiped);
  //   }
  // }

  /* ----------------------------------- DROP --------------------------------------*/
  const dragOver = (e) => {
    e.preventDefault();
  };

  if (equipment) {
    equipment.items.sort((a, b) => {
      let fa = a.id,
        fb = b.id;
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }

  const testing = () => {
    // const equipamientoInventario = [
    //   "ring",
    //   "helmet",
    //   "wings",
    //   "sword",
    //   "armor",
    //   "shield",
    //   "gloves",
    //   "pants",
    //   "boots",
    // ];

    // for(let i = 0; i < equipment.items.length, i++) {}

    if (
      divGloves.id === equipment.items[1].type &&
      !divGloves.hasChildNodes()
    ) {
      const divItemEquiped = document.createElement("div");
      const imgItemEquiped = document.createElement("img");
      divItemEquiped.setAttribute("id", equipment.items[1].id);
      divItemEquiped.setAttribute("draggable", true);

      divItemEquiped.ondrag = function draggg() {
        setDataItemEquiped({
          name: equipment.items[1].name,
          id: equipment.items[1].id,
          type: equipment.items[1].type,
        });
      };

      divItemEquiped.classList.add("invEquiped");

      imgItemEquiped.setAttribute("src", require(`../img/items/daga.png`));
      imgItemEquiped.classList.add("item", "itemEquiped");

      divItemEquiped.appendChild(imgItemEquiped);
      divGloves.appendChild(divItemEquiped);
    }
  };

  const dropEquiped = () => {
    if (divRing.id === dataItemBox.type && !divRing.hasChildNodes()) {
      divRing.appendChild(itemBox);
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
    } else if (divSword.id === dataItemBox.type && !divSword.hasChildNodes()) {
      divSword.appendChild(itemBox);
    } else if (divArmor.id === dataItemBox.type && !divArmor.hasChildNodes()) {
      divArmor.appendChild(itemBox);
    } else if (
      divShield.id === dataItemBox.type &&
      !divShield.hasChildNodes()
    ) {
      divShield.appendChild(itemBox);
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
        {/* {equipment &&
          equipment.items?.map((items) => (
            <div
              draggable="true"
              key={items.id}
              id={items.id}
              className="invEquiped"
              onDrag={() => {
                setDataItemEquiped({
                  name: items.name,
                  id: items.id,
                  type: items.type,
                });
              }}
            >
              <img
                src={require(`../img/items/daga.png`)}
                className="item itemEquiped"
                alt=""
              />
            </div>
          ))} */}
        <div id="ring" className="divEquiped"></div>
        <div id="helmet" className="divEquiped"></div>
        <div id="wings" className="divEquiped"></div>
        <div id="sword" className="divEquiped"></div>
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
                src={require(`../img/items/ring.png`)}
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
