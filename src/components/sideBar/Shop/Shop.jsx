import React, { useEffect, useState } from "react";
import UserInventory from "../../userProfile/UserInventory";
import Navbar from "../../userProfile/Navbar";

import { headers, dataTooltip, sounds } from "../../../functions/utilities";
import { get, post } from "../../../functions/requestsApi";

const Shop = () => {
  const [profile, setProfile] = useState({});
  const [itemDragBuy, setItemDragBuy] = useState("");
  const [itemsShop, setItemsShop] = useState([]);
  const [showTooltip, setShowTooltip] = useState(true);

  const [itemDragShop, setItemDragShop] = useState(null);

  async function getProfile() {
    const response = await get("/api/v1/users/profile", headers);
    if (response.status === 200) {
      setProfile(response.data);
    }
  }

  async function handleItems(iClass) {
    const response = await get("/api/v1/items/shop/" + iClass, headers);
    if (response.status === 200) setItemsShop(response.data);
  }

  async function handleISelltems(values) {
    const response = await post("/api/v1/items/sell", values, headers);
    if (response.status === 200) {
      setItemDragShop(response.data.inventory);
      profile.gold = response.data.gold;
      sounds("buySell");
    }
  }

  async function handleItemBuy(itemToBuy) {
    const data = { name: itemToBuy };
    const response = await post("/api/v1/items/buy", data, headers);
    if (response.status === 200) {
      setItemDragShop(response.data);
      /* actualizar oro aca */
      sounds("buySell");
    }
  }

  useEffect(() => {
    getProfile();
    handleItems("none");
  }, []);

  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="shop">
      <Navbar
        gold={profile.gold}
        diamond={profile.diamond}
        role={profile.role}
        itemDragShop={itemDragShop}
      />
      <div className="shop--items">
        <div className="shop--inventory">
          {profile.equipment && (
            <UserInventory
              inventory={profile.inventory}
              equipment={profile.equipment}
              aclass={profile.aclass}
              itemDragBuy={itemDragBuy}
              level={profile.level}
              itemDragShop={itemDragShop}
              handleItemBuy={handleItemBuy}
            />
          )}
        </div>
        <div className="shop--npc">
          <h3>Shop</h3>
          <div>
            <div className="shop--npc--button">
              <button
                id="none"
                onClick={() => {
                  handleItems("none");
                }}
              >
                All
              </button>
              <button
                id="mage"
                onClick={() => {
                  handleItems("mage");
                }}
              >
                Mage
              </button>
              <button
                id="warrior"
                onClick={() => {
                  handleItems("warrior");
                }}
              >
                Warrior
              </button>
              <button
                id="archer"
                onClick={() => {
                  handleItems("archer");
                }}
              >
                Archer
              </button>
            </div>
            <div
              className="shop--npc--section"
              id="shop--npc--card"
              onDragOver={dragOver}
            >
              <div
                className="shop--npc--card"
                id="shopNpcSellBuy"
                onDrop={(event) => {
                  if (
                    itemDragBuy === "S" ||
                    event.dataTransfer.getData("ETransfer") === "E"
                  ) {
                    return;
                  }
                  handleISelltems({
                    name: event.dataTransfer.getData("nameItemSell"),
                  });
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
                      profile.aclass &&
                      item.classRequired !== profile.aclass &&
                      item.classRequired !== "none"
                        ? "itemNoClass"
                        : item.lvlMin > profile.level
                        ? "itemNoLevel"
                        : ""
                    }
                    onDragStart={(event) => {
                      setShowTooltip(false);
                      setItemDragBuy("S");
                      event.dataTransfer.setData("itemBuy", item.name);
                    }}
                    onDragEnd={() => {
                      setShowTooltip(true);
                      setItemDragBuy("");
                    }}
                    {...(showTooltip && {
                      "data-tooltip": dataTooltip(item, 1),
                    })}
                  >
                    <img
                      src={require(`../../img/items/${item.name}.png`)}
                      className="item"
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

const ItemStyle = {
  display: "flex",
  maxWidth: "36px",
  maxHeight: "36px",
  marginLeft: "3px",
  marginTop: "2px",
};
