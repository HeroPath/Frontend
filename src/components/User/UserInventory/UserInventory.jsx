import { useState, useEffect } from "react";
import "./userInventory.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { get } from "../../../functions/requestsApi";
import { headers, dataTooltip, sounds } from "../../../functions/utilities";
import { objectEmpty, orderEquipment } from "../../../functions/constants";

const UserInventory = ({
  inventory,
  equipment,
  aclass,
  itemDragBuy,
  level,
  itemDragShop,
  updateStats,
  handleItemBuy,
}) => {
  const [inventoryUser, setInventoryUser] = useState(inventory);
  const [equipmentUser, setEquipmentUser] = useState(equipment);
  const [letterDrag, setLetterDrag] = useState("");
  const [dataItem, setDataItem] = useState({});
  const [showTooltip, setShowTooltip] = useState(true);

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

  useEffect(() => {
    setInventoryUser(inventoryUser);
  }, [inventoryUser]);

  const dragOver = (e) => {
    e.preventDefault();
  };

  async function handleItem(equipping) {
    if (dataItem === {}) return;
    let equip = equipping === true ? "equip/" : "unequip/";
    
    const response = await get("/api/v1/items/" + equip + dataItem.id, headers);
    if (response.status === 200) {
      setInventoryUser(response.data.inventory);
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
                    setShowTooltip(false);
                    setDataItem({ id: item.id, name: item.name });
                    setLetterDrag("E");
                    event.dataTransfer.setData("ETransfer", "E");
                  }}
                  onDragEnd={() => {
                    setShowTooltip(true);
                    setLetterDrag("");
                  }}
                  {...(showTooltip && { "data-tooltip": dataTooltip(item) })}
                >
                  <img src={require(`../../../img/items/${item.classRequired}/${item.name}.png`)} className="item" alt="" />
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
              onDragStart={(event) => {
                setShowTooltip(false);
                event.dataTransfer.setData("nameItemSell", item.id);
                setDataItem({ id: item.id, name: item.name });
                setLetterDrag("I");
              }}
              onDragEnd={(event) => {
                setShowTooltip(true);
                setLetterDrag("");
                event.dataTransfer.setData("nameItemSell", "");
              }}
              {...(showTooltip && { "data-tooltip": dataTooltip(item) })}
            >
              <img src={require(`../../../img/items/${item.classRequired}/${item.name}.png`)} className="item" />
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
