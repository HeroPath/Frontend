import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import UserInventory from "../../userProfile/UserInventory";
import Navbar from "../../userProfile/Navbar";

const Shop = () => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };
  const [dataItem, setDataItem] = useState({});
  const [profile, setProfile] = React.useState({});
  const itemBuy = document.getElementById(dataItem.id);

  const [itemsShop, setItemsShop] = useState([]);

  async function handleData() {
    await axios
      .get("https://ao-web.herokuapp.com/api/v1/users/profile", { headers })
      .then(async (response) => {
        if (response.status === 200) {
          setProfile(response.data);
        }
      });
  }
  async function handleItems(iClass) {
    await axios
      .get("https://ao-web.herokuapp.com/api/v1/items/shop/" + iClass, {
        headers,
      })
      .then(async (response) => {
        if (response.status === 200) {
          setItemsShop(response.data);
        }
      });
  }

  useEffect(() => {
    handleData();
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
            <div className="shop--item--type">
              <button>Ship</button>
              <button>Helmet</button>
              <button>Wings</button>
              <button>Weapon</button>
              <button>Armor</button>
              <button>Shield</button>
              <button>Gloves</button>
              <button>Pants</button>
              <button>Boots</button>
            </div>

            <div
              className="shop--npc--card"
              // onDragOver={dragOver}
              // onDrop={dropBox}
            >
              {itemsShop.map((item) => (
                <div
                  draggable="true"
                  key={item.id}
                  id={item.id}
                  style={{
                    display: "flex",
                    maxWidth: "35px",
                    maxHeight: "35px",
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
  );
};

export default Shop;
