import React, { useState, useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { post } from "../../functions/requestsApi";
import { headers, dataTooltip } from "../../functions/utilities";

const UserInventory = ({
  inventory,
  equipment,
  aclass,
  nameItemBuy,
  itemDragBuy,
  level,
}) => {
  const [inventoryUser, setInventoryUser] = useState(inventory);
  const [equipmentUser, setEquipmentUser] = useState(equipment);
  const [letterDrag, setLetterDrag] = useState("");
  const [dataItem, setDataItem] = useState(0);

  const [showTooltip, setShowTooltip] = useState(true);

  function orderedObject(equipUser) {
    const objectEmpty = { type: "empty" };
    const order = [
      "ship",
      "helmet",
      "wings",
      "weapon",
      "armor",
      "shield",
      "gloves",
      "pants",
      "boots",
    ];

    let sortedItems = [];
    for (const itemType of order) {
      let item = equipUser.items.find((item) => item.type === itemType);
      if (!item) item = objectEmpty;
      sortedItems.push(item);
    }
    equipUser.items = sortedItems;
    return equipUser;
  }
  orderedObject(equipmentUser);

  useEffect(() => {
    setInventoryUser(inventoryUser);
    setEquipmentUser(equipmentUser);
  }, [inventory, equipment]);

  const dragOver = (e) => {
    e.preventDefault();
  };

  async function handleItem(equipping) {
    if (dataItem === 0) return;

    let data = { id: dataItem };
    let equip = equipping === true ? "equip" : "unequip";

    const response = await post("/api/v1/items/" + equip, data, headers);
    if (response.status === 200) {
      setInventoryUser(response.data.inventory);
      setEquipmentUser(response.data.equipment);
    }
  }

  async function handleItemBuy(itemToBuy) {
    const data = { name: itemToBuy };
    const response = await post("/api/v1/items/buy", data, headers);
    if (response.status === 200) {
      setInventoryUser(response.data);
    }
  }

  const dropEquiped = () => {
    handleItem(true);
  };

  function dropBox() {
    if (itemDragBuy === "S") {
      handleItemBuy(nameItemBuy);
    } else {
      handleItem(false);
    }
  }

  /* ------------------- TEST -------------------*/
  const [draggedItem, setDraggedItem] = useState({});
  /* ------------------- TEST -------------------*/

  return (
    <div className="inventory" id="inventory">
      <h2>Inventory</h2>
      <div
        className="inventory--equiped"
        id="inventory--equiped"
        onDragOver={dragOver}
        onDrop={() => {
          if (letterDrag === "I") dropEquiped();
        }}
      >
        {equipmentUser &&
          equipmentUser.items.map((item, index) => {
            if (item.type === "empty") {
              return <div key={index} style={ItemStyle}></div>;
            } else {
              return (
                <div
                  draggable="true"
                  key={index}
                  id={index}
                  style={ItemStyle}
                  onDragStart={(event) => {
                    setShowTooltip(false);
                    setDataItem(item.id);
                    setLetterDrag("E");
                    event.dataTransfer.setData("ETransfer", "E");
                  }}
                  onDragEnd={() => {
                    setShowTooltip(true);
                    setLetterDrag("");
                  }}
                  {...(showTooltip && { "data-tooltip": dataTooltip(item, 2) })}
                >
                  <img
                    src={require(`../img/items/${item.name}.png`)}
                    className="item"
                  />
                </div>
              );
            }
          })}
      </div>
      <div
        className="inventory--box"
        id="inventory--box"
        onDragOver={dragOver}
        onDrop={() => {
          if (letterDrag === "E" || itemDragBuy === "S") dropBox();
        }}
      >
        {inventoryUser &&
          inventoryUser.items.map((item, index) => (
            <div
              draggable="true"
              key={index}
              id={item.id}
              style={ItemStyle}
              className={
                item.classRequired !== aclass.name &&
                item.classRequired !== "none"
                  ? "itemNoClass"
                  : item.lvlMin > level
                  ? "itemNoLevel"
                  : ""
              }
              onDragStart={(event) => {
                setShowTooltip(false);
                event.dataTransfer.setData("nameItemSell", item.name);
                setDataItem(item.id);
                setLetterDrag("I");
              }}
              onDragEnd={() => {
                setShowTooltip(true);
                setLetterDrag("");
              }}
              {...(showTooltip && { "data-tooltip": dataTooltip(item, 2) })}
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

const ItemStyle = {
  display: "flex",
  maxWidth: "36px",
  maxHeight: "36px",
  marginLeft: "3px",
  marginTop: "2px",
};
