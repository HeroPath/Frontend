import { useState, useEffect } from "react";
import "./userInventory.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { get } from "../../../functions/requestsApi";
import { headers, sounds, sortedInventory } from "../../../functions/utilities";
import { objectEmpty, orderEquipment } from "../../../functions/constants";

import ItemTooltip from "../../ItemTooltip";

const UserInventory = ({
  inventory,
  equipment,
  aclass,
  itemDragBuy,
  level,
  itemDragShop,
  updateStats,
  handleItemBuy,
  setDataItemUpgrade,
}) => {
  const [inventoryUser, setInventoryUser] = useState(inventory);
  const [equipmentUser, setEquipmentUser] = useState(equipment);
  const [letterDrag, setLetterDrag] = useState("");
  const [dataItem, setDataItem] = useState({});

  function orderedObject(equipUser) {
    let sortedItems = [];
    for (const itemType of orderEquipment) {
      let item = equipUser.items.find((item) => item.type === itemType);
      if (!item) item = objectEmpty;
      sortedItems.push(item);
    }
    equipUser.items = sortedItems;
    return equipUser;
  }

  orderedObject(equipmentUser);

  useEffect(() => {
    if (itemDragShop !== null) setInventoryUser(itemDragShop);
  }, [itemDragShop, inventory]);

  /*TODO: LUCHO
  useEffect(() => {
    setInventoryUser(sortedInventory(inventoryUser.items));
  }, [inventoryUser]);
  */

  useEffect(() => {
    setInventoryUser(sortedInventory(inventory.items));
  }, [inventory]);

  const dragOver = (e) => {
    e.preventDefault();
  };

  async function handleItem(equipping) {
    if (dataItem === {}) return;
    let equip = equipping === true ? "equip/" : "unequip/";

    const response = await get("/api/v1/items/" + equip + dataItem.id, headers);
    if (response.status === 200) {
      setInventoryUser(sortedInventory(response.data.inventory.items));
      setEquipmentUser(response.data.equipment);
      if (dataItem.name === "potion") {
        sounds("potion");
      } else {
        sounds("equip");
      }
      if (updateStats !== undefined) updateStats(response.data);
    }
  }

  return (
    <div className="inventory" id="inventory">
      <h2>Inventory</h2>
      <div
        className="inventory--equiped"
        id="inventory--equiped"
        onDragOver={dragOver}
        onDrop={() => {
          if (letterDrag === "I") {
            handleItem(true);
          }
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
                    setDataItem({ id: item.id, name: item.name });
                    setLetterDrag("E");
                    event.dataTransfer.setData("ETransfer", "E");
                  }}
                  onDragEnd={() => {
                    setLetterDrag("");
                  }}
                >
                  <ItemTooltip item={item} />
                </div>
              );
            }
          })}
      </div>
      <div
        className="inventory--box"
        id="inventory--box"
        onDragOver={dragOver}
        onDrop={(e) => {
          if (letterDrag === "E") handleItem(false);

          if (itemDragBuy === "S") handleItemBuy(e.dataTransfer.getData("itemBuy"));
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
                item.classRequired !== aclass && item.classRequired !== "none"
                  ? "itemNoClass"
                  : item.lvlMin > level
                  ? "itemNoLevel"
                  : ""
              }
              onClick={() => {
                if (item.name === "progress gem" || item.name === "potion") return;
                setDataItemUpgrade(item);
              }}
              onDragStart={(event) => {
                event.dataTransfer.setData("nameItemSell", item.id);
                setDataItem({ id: item.id, name: item.name });
                setLetterDrag("I");
              }}
              onDragEnd={(event) => {
                setLetterDrag("");
                event.dataTransfer.setData("nameItemSell", "");
              }}
            >
              <ItemTooltip item={item} />
            </div>
          ))}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        antperuka
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
};
