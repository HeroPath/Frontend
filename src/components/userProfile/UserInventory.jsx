import React, { useState, useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { post } from "../../functions/requestsApi";
import { headers } from "../../functions/utilities";

const UserInventory = ({
  inventory,
  equipment,
  aclass,
  nameItemBuy,
  level,
}) => {
  const [inventoryUser, setInventoryUser] = useState(inventory);
  const [equipmentUser, setEquipmentUser] = useState(equipment);
  const [itemBuy, setItemBuy] = useState(nameItemBuy);

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
      if (!item) {
        item = objectEmpty;
      }
      sortedItems.push(item);
    }
    equipUser.items = sortedItems;
    return equipUser;
  }
  orderedObject(equipmentUser);

  useEffect(() => {
    setInventoryUser(inventoryUser);
    setEquipmentUser(equipmentUser);
    setItemBuy(nameItemBuy);
  }, [inventory, equipment, nameItemBuy]);

  const [dataItem, setDataItem] = useState({});

  const dragOver = (e) => {
    e.preventDefault();
  };

  async function handleItem(equipping) {
    let data = { id: dataItem.id };
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
      setItemBuy("");
    }
  }

  const dropEquiped = () => {
    handleItem(true);
  };

  function dropBox() {
    if (itemBuy && itemBuy !== undefined) {
      handleItemBuy(itemBuy);
    } else {
      handleItem(false);
    }
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
        {equipmentUser &&
          equipmentUser.items.map((item, index) => {
            if (item.type === "empty") {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    maxWidth: "36px",
                    maxHeight: "36px",
                    marginLeft: "3px",
                    marginTop: "2px",
                  }}
                ></div>
              );
            } else {
              return (
                <div
                  draggable="true"
                  key={index}
                  id={index}
                  style={{
                    display: "flex",
                    maxWidth: "36px",
                    maxHeight: "36px",
                    marginLeft: "3px",
                    marginTop: "2px",
                  }}
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
                </div>
              );
            }
          })}
      </div>
      <div
        className="inventory--box"
        id="inventory--box"
        onDragOver={dragOver}
        onDrop={dropBox}
      >
        {inventoryUser &&
          inventoryUser.items.map((item, index) => (
            <div
              draggable="true"
              key={index}
              id={index}
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
