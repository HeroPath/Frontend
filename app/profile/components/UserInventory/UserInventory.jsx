import { useState, useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { headers, sounds, sortedInventory } from "@/functions/utilities";
import { objectEmpty, orderEquipment } from "@/functions/constants";

import "./userInventory.css";

import ItemTooltip from "../../../components/tooltip/ItemTooltip";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserBox } from "@/store/slice";

const UserInventory = ({
  inventory,
  equipment,
  aclass,
  itemDragBuy,
  level,
  itemDragShop,
  handleItemBuy,
  setDataItemUpgrade,
}) => {
  const dispatch = useDispatch();
  const inventoryUser = useSelector((state) =>
    Object.keys(state.Slice.userBox.userInventory).length !== 0 ? state.Slice.userBox.userInventory : inventory
  );

  let equipmentUser = useSelector((state) =>
    Object.keys(state.Slice.userBox.userEquipment).length !== 0 ? state.Slice.userBox.userEquipment : equipment
  );

  const [letterDrag, setLetterDrag] = useState("");
  const [dataItem, setDataItem] = useState({});

  async function handleItem(equipping) {
    dispatch(fetchUserBox(equipping, dataItem));
  }

  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="inventory" id="inventory">
      {/* <h2>Inventory</h2> */}
      <h1 className="text-3xl font-bold underline">Inventory</h1>
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
