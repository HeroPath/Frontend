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

  async function handleItemBuy() {
    await axios
      .post("https://ao-web.herokuapp.com/api/v1/users/buyitem/" + dataItem, {
        headers,
      })
      .then(async (response) => {
        if (response.status === 200) {
        }
      });
  }

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
    // handleItemBuy();
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
        />
      </div>
      <div className="shop--npc">
        <h3>Shop</h3>
        <div className="shop--npc--button">
          <button>Mage</button>
          <button>Warrior</button>
          <button>Archer</button>
        </div>
        <div
          className="shop--npc--card"
          id="inventory--box"
          onDragOver={dragOver}
        >
          <div
            draggable="true"
            style={{ display: "flex", maxWidth: "40px", maxHeight: "40px" }}
            id={1000}
            onDragStart={() => {
              setDataItem({
                name: "legendary armor",
                id: 1000,
                type: "armor",
              });
            }}
          >
            <img
              src={require(`../../img/items/legendary armor.png`)}
              className="item"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
