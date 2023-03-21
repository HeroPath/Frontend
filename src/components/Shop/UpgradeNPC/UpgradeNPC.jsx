import { useState, useEffect } from "react";
import { headers, dataTooltip, sounds, sortedInventory, countGemInventory } from "../../../functions/utilities";
import { get } from "../../../functions/requestsApi";
import "./upgradeNPC.css";

const UpgradeNPC = ({ dataItemUpgrade, setDataItemUpgrade, amountGems, setAmountGems, setItemUpgrade }) => {
  const [itemUpgradeExist, setItemUpgradeExist] = useState(false);
  const [lvlItem, setLvlItem] = useState(undefined);
  const [canUpgrade, setCanUpgrade] = useState(undefined);

  async function handleUpgrade(itemId) {
    const response = await get("/api/v1/items/upgrade/" + itemId, headers);
    if (response.status === 200) {
      setItemUpgradeExist(false);
      setCanUpgrade(undefined);
      setLvlItem(undefined);
      setItemUpgrade(sortedInventory(response.data.items));
      setAmountGems(countGemInventory(response.data.items));
      setDataItemUpgrade({});
    }
  }

  useEffect(() => {
    if (dataItemUpgrade.id) {
      if (!(amountGems >= dataItemUpgrade.itemLevel + 1)) {
        setItemUpgradeExist(false);
        setCanUpgrade(false);
        setLvlItem(undefined);
        return;
      }

      setCanUpgrade(true);
      setItemUpgradeExist(true);
      setLvlItem(dataItemUpgrade.itemLevel);
    }
  }, [dataItemUpgrade]);

  useEffect(() => {
    setItemUpgradeExist(false);
    setCanUpgrade(undefined);
    setLvlItem(undefined);
    setDataItemUpgrade({});
  }, []);

  return (
    <>
      <div className="shop--npc--section" id="shop--npc--card">
        <div className="upgrade--npc--card" id="upgradeNpc">
          <div className="upgradeDiv">
            {lvlItem !== undefined && lvlItem < 5 && (
              <img src={require(`../../../img/items/none/progress gem.png`)} className="item" />
            )}
          </div>
          <div className="upgradeDiv">
            {lvlItem > 3 && lvlItem < 5 && (
              <img src={require(`../../../img/items/none/progress gem.png`)} className="item" />
            )}
          </div>
          <div className="upgradeDiv">
            {lvlItem > 0 && lvlItem < 5 && (
              <img src={require(`../../../img/items/none/progress gem.png`)} className="item" />
            )}
          </div>
          <div
            className="upgradeDiv"
            onDrop={() => {
              if (event.dataTransfer.getData("ITransfer") !== "I") {
                return;
              }
              setItemUpgradeExist(true);
            }}
            {...(itemUpgradeExist && { "data-tooltip": dataTooltip(dataItemUpgrade) })}
          >
            {itemUpgradeExist && (
              <img
                src={require(`../../../img/items/${dataItemUpgrade.classRequired}/${dataItemUpgrade.name}.png`)}
                className="item"
              />
            )}
          </div>

          <div className="upgradeDiv">
            {lvlItem > 2 && lvlItem < 5 && (
              <img src={require(`../../../img/items/none/progress gem.png`)} className="item" />
            )}
          </div>
          <div className="upgradeDiv">
            {lvlItem > 1 && lvlItem < 5 && (
              <img src={require(`../../../img/items/none/progress gem.png`)} className="item" />
            )}
          </div>
        </div>
      </div>

      {canUpgrade === undefined ? (
        <div className="undefinedUpgrade">
          <label>Click on the item you want to upgrade</label>
        </div>
      ) : canUpgrade === true ? (
        <div className="canUpgrade">
          <h5>Upgrade details:</h5>
          <div className="canUpgrade--info">
            <div className="canUpgrade--stats">
              <label>Level: {dataItemUpgrade.itemLevel}</label>
              <span>+1</span>
            </div>
            <div className="canUpgrade--stats">
              <label>Strength: {dataItemUpgrade.strength}</label>
              <span>+{dataItemUpgrade.itemLevel + 1} </span>
            </div>
            <div className="canUpgrade--stats">
              <label>Dexterity: {dataItemUpgrade.dexterity}</label>
              <span>+{dataItemUpgrade.itemLevel + 1} </span>
            </div>
            <div className="canUpgrade--stats">
              <label>Intelligence: {dataItemUpgrade.intelligence}</label>
              <span>+{dataItemUpgrade.itemLevel + 1} </span>
            </div>
            <div className="canUpgrade--stats">
              <label>Vitality: {dataItemUpgrade.vitality}</label>
              <span>+{dataItemUpgrade.itemLevel + 1} </span>
            </div>
            <div className="canUpgrade--stats">
              <label>Luck: {dataItemUpgrade.luck}</label>
              <span>+{dataItemUpgrade.itemLevel + 1} </span>
            </div>
          </div>
          <button
            className="effect"
            onClick={() => {
              handleUpgrade(dataItemUpgrade.id);
            }}
          >
            UPGRADE
          </button>
        </div>
      ) : (
        <div className="cantUpgrade">
          {dataItemUpgrade.itemLevel >= 5 ? (
            <label className="itemMaximumLvl">The item is already maximum level</label>
          ) : (
            <label className="notEnoughGems">You do not have enough gems to upgrade this item.</label>
          )}
        </div>
      )}
    </>
  );
};

export default UpgradeNPC;
