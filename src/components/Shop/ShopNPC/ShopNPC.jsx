import { useState } from "react";
import { dataTooltip } from "../../../functions/utilities";
import "./shopNPC.css";

const ShopNPC = ({
  focusedButton,
  itemDragBuy,
  itemsShop,
  aclass,
  level,
  handleItems,
  handleISelltems,
  setItemDragShop,
  setItemDragBuy,
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const dragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="shop--npc--button">
        <button
          id="none"
          onClick={() => {
            handleItems("none");
          }}
          className={focusedButton === "none" ? "active" : ""}
        >
          All
        </button>
        <button
          id="mage"
          onClick={() => {
            handleItems("mage");
          }}
          className={focusedButton === "mage" ? "active" : ""}
        >
          Mage
        </button>
        <button
          id="warrior"
          onClick={() => {
            handleItems("warrior");
          }}
          className={focusedButton === "warrior" ? "active" : ""}
        >
          Warrior
        </button>
        <button
          id="archer"
          onClick={() => {
            handleItems("archer");
          }}
          className={focusedButton === "archer" ? "active" : ""}
        >
          Archer
        </button>
      </div>
      <div className="shop--npc--section" id="shop--npc--card" onDragOver={dragOver}>
        <div
          className="shop--npc--card"
          id="shopNpcSellBuy"
          onDrop={(event) => {
            if (itemDragBuy === "S" || event.dataTransfer.getData("ETransfer") === "E") {
              return;
            }
            handleISelltems(event.dataTransfer.getData("nameItemSell"));
            setItemDragShop(null);
          }}
        >
          {itemsShop.map((item, index) => (
            <div
              draggable="true"
              key={index}
              id={item.id}
              style={ItemStyle}
              className={
                aclass && item.classRequired !== aclass && item.classRequired !== "none"
                  ? "itemNoClass"
                  : item.lvlMin > level
                  ? "itemNoLevel"
                  : ""
              }
              onDragStart={(event) => {
                setShowTooltip(false);
                setItemDragBuy("S");
                event.dataTransfer.setData("itemBuy", item.id);
              }}
              onDragEnd={() => {
                setShowTooltip(true);
                setItemDragBuy("");
              }}
              {...(showTooltip && {
                "data-tooltip": dataTooltip(item),
              })}
            >
              <img src={require(`../../../img/items/${item.classRequired}/${item.name}.png`)} className="item" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopNPC;

const ItemStyle = {
  display: "flex",
  maxWidth: "36px",
  maxHeight: "36px",
  marginLeft: "3px",
  marginTop: "2px",
};
