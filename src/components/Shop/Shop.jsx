import { useEffect, useState } from "react";
import UserInventory from "../User/UserInventory/UserInventory";
import Navbar from "../User/Navbar/Navbar";
import "./shop.css";
import ShopNPC from "./ShopNPC";
import UpgradeNPC from "./UpgradeNPC";

import { headers, sounds } from "../../functions/utilities";
import { get } from "../../functions/requestsApi";

const Shop = () => {
  const [profile, setProfile] = useState({});
  const [itemDragBuy, setItemDragBuy] = useState("");
  const [itemsShop, setItemsShop] = useState([]);

  const [itemDragShop, setItemDragShop] = useState(null);
  const [focusedButton, setFocusedButton] = useState("none");

  const [npcCommerce, setNpcCommerce] = useState("shop");

  async function getProfile() {
    const response = await get("/api/v1/users/profile", headers);
    if (response.status === 200) {
      setProfile(response.data);
    }
  }

  async function handleItems(iClass) {
    setFocusedButton(iClass);
    const response = await get("/api/v1/items/shop/" + iClass, headers);
    if (response.status === 200) setItemsShop(response.data);
  }

  async function handleISelltems(itemToSellId) {
    const response = await get("/api/v1/items/sell/" + itemToSellId, headers);
    if (response.status === 200) {
      setItemDragShop(response.data.inventory);
      profile.gold = response.data.userGold;
      sounds("buySell");
    }
  }

  async function handleItemBuy(itemToBuyId) {
    const response = await get("/api/v1/items/buy/" + itemToBuyId, headers);
    if (response.status === 200) {
      setItemDragShop(response.data.inventory);
      profile.gold = response.data.userGold;
      sounds("buySell");
    }
  }

  useEffect(() => {
    getProfile();
    handleItems("none");
  }, []);

  return (
    <div className="shop">
      <Navbar gold={profile.gold} diamond={profile.diamond} role={profile.role} itemDragShop={itemDragShop} />
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
          <div className="shop--npc--button divSelectNpc">
            <button
              id="shop"
              onClick={() => {
                setNpcCommerce("shop");
              }}
            >
              SHOP
            </button>
            <button
              id="upgrade"
              onClick={() => {
                setNpcCommerce("upgrade");
              }}
            >
              UPGRADE
            </button>
          </div>
          {npcCommerce === "shop" ? (
            <>
              <h3>Shop</h3>
              <ShopNPC
                focusedButton={focusedButton}
                itemDragBuy={itemDragBuy}
                itemsShop={itemsShop}
                aclass={profile.aclass}
                level={profile.level}
                handleItems={handleItems}
                handleISelltems={handleISelltems}
                setItemDragShop={setItemDragShop}
                setItemDragBuy={setItemDragBuy}
              />
            </>
          ) : (
            <>
              <h3>Upgrade</h3>
              <UpgradeNPC />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
