import React, { useEffect, useState } from "react";
import UserInventory from "../../userProfile/UserInventory";
import Navbar from "../../userProfile/Navbar";

import { headers } from "../../../functions/utilities";
import { get, post } from "../../../functions/requestsApi";

const Shop = () => {
  const [dataItem, setDataItem] = useState({});
  const [profile, setProfile] = useState({});
  const itemBuy = document.getElementById(dataItem.id);

  const [itemsShop, setItemsShop] = useState([]);

  async function getProfile() {
    const response = await get("/api/v1/users/profile", headers);
    if (response.status === 200) setProfile(response.data);
  }

  async function handleItems(iClass) {
    const response = await get("/api/v1/items/shop/" + iClass, headers);
    if (response.status === 200) setItemsShop(response.data);
  }

  async function handleISelltems(values) {
    const response = await post("/api/v1/items/sell", values, headers);
    if (response.status === 200) window.location.reload();
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
      />
      <div className="shop--items">
        <div className="shop--inventory">
          <UserInventory
            inventory={profile.inventory}
            equipment={profile.equipment}
            aclass={profile.aclass}
            itemBuy={itemBuy}
            nameItemBuy={dataItem.name}
            level={profile.level}
          />
        </div>
        <div className="shop--npc">
          <h3>Shop</h3>
          <div style={{ paddingLeft: "160px" }}>
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
                  handleISelltems({
                    name: event.dataTransfer.getData("nameItemSell"),
                  });
                }}
              >
                {itemsShop.map((item, index) => (
                  <div
                    draggable="true"
                    key={index}
                    id={item.id}
                    style={{
                      display: "flex",
                      maxWidth: "36px",
                      maxHeight: "36px",
                      marginTop: "2px",
                      marginLeft: "3px",
                      justifyContent: "center",
                    }}
                    className={
                      profile.aclass &&
                      item.classRequired !== profile.aclass.name &&
                      item.classRequired !== "none"
                        ? "itemNoClass"
                        : item.lvlMin > profile.level
                        ? "itemNoLevel"
                        : ""
                    }
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
                
                Price: ${item.price}`}
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
