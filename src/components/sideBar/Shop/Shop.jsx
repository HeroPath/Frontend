import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import UserInventory from "../../userProfile/UserInventory";

const Shop = () => {
  const cookies = new Cookies();
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + cookies.get("token"),
  };
  const [dataItem, setDataItem] = useState({});
  const [profile, setProfile] = React.useState({});

  const itemBuy = document.getElementById(dataItem.id);

  async function handleData() {
    await axios
      .get("https://ao-web.herokuapp.com/api/v1/users/profile", { headers })
      .then(async (response) => {
        if (response.status === 200) {
          setProfile(response.data);
        }
      });
  }

  useEffect(() => {
    handleData();
  }, []);

  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="shop">
      <div className="shop--inventory">
        <UserInventory
          inventory={profile.inventory}
          equipment={profile.equipment}
          aclass={profile.aclass}
          itemBuy={itemBuy}
          nameItemBuy={dataItem.name}
        />
      </div>
      <div className="shop--npc">
        <h3>Shop</h3>
        <div className="shop--npc--button">
          <button>All</button>
          <button>Mage</button>
          <button>Warrior</button>
          <button>Archer</button>
        </div>
        <div
          className="shop--npc--card"
          id="shop--npc--card"
          onDragOver={dragOver}
        >
          {/* {inventory.items.map((item) => ( */}

          
          <div
            draggable="true"
            // key={item.id}
            id={1000}
            style={{
              display: "flex",
              maxWidth: "40px",
              maxHeight: "40px",
              justifyContent: "center",
            }}
            // className={
            //   item.classRequired !== profile.aclass.name &&
            //   item.classRequired !== "none"
            //     ? "itemNoClass"
            //     : ""
            // }
            onDragStart={() => {
              setDataItem({
                name: "legendary armor",
                id: 1000,
                type: "armor",
              });
            }}
            // data-tooltip={`Name: ${item.name}
            // Strength: ${item.strength}
            // Dexterity: ${item.dexterity}
            // Vitality: ${item.vitality}
            // Intelligence: ${item.intelligence}
            // Level Min: ${item.lvlMin}
            // Class: ${item.classRequired}`}
          >
            <img
              src={require(`../../img/items/legendary armor.png`)}
              className="item"
              alt=""
            />
          </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default Shop;
