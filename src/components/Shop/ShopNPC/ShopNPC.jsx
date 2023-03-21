import "./shopNPC.css";
import ItemTooltip from "../../ItemTooltip";

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
                setItemDragBuy("S");
                event.dataTransfer.setData("itemBuy", item.id);
              }}
              onDragEnd={() => {
                setItemDragBuy("");
              }}
            >
              <ItemTooltip item={item} />
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
