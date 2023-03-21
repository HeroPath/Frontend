import { useState, useEffect } from "react";
import { dataTooltip } from "../../functions/utilities";

const UpgradeNPC = ({ dataItemUpgrade, inventory }) => {
  const [itemUpgradeExist, setItemUpgradeExist] = useState(false);
  const [lvlItem, setLvlItem] = useState(undefined);
  const [canUpgrade, setCanUpgrade] = useState(undefined);

  const amountGems = inventory.filter((item) => item.name === "progress gem").length;

  useEffect(() => {
    if (dataItemUpgrade.id) {
      if (!(amountGems >= dataItemUpgrade.itemLevel + 1)) {
        setCanUpgrade(false);
        setItemUpgradeExist(false);
        setLvlItem(undefined);
        return;
      }
      setCanUpgrade(true);
      setItemUpgradeExist(true);
      setLvlItem(dataItemUpgrade.itemLevel);
    }
  }, [dataItemUpgrade]);

  return (
    <>
      <div className="shop--npc--section" id="shop--npc--card">
        <div className="upgrade--npc--card" id="upgradeNpc">
          <div className="upgradeDiv">
            {lvlItem !== undefined && <img src={require(`../../img/items/none/progress gem.png`)} className="item" />}
          </div>
          <div className="upgradeDiv">
            {lvlItem > 3 && <img src={require(`../../img/items/none/progress gem.png`)} className="item" />}
          </div>
          <div className="upgradeDiv">
            {lvlItem > 0 && <img src={require(`../../img/items/none/progress gem.png`)} className="item" />}
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
                src={require(`../../img/items/${dataItemUpgrade.classRequired}/${dataItemUpgrade.name}.png`)}
                className="item"
              />
            )}
          </div>

          <div className="upgradeDiv">
            {lvlItem > 2 && <img src={require(`../../img/items/none/progress gem.png`)} className="item" />}
          </div>
          <div className="upgradeDiv">
            {lvlItem > 1 && <img src={require(`../../img/items/none/progress gem.png`)} className="item" />}
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
          <div className="upgradeDetails">
            <ul>
              <li>asdsd</li>
              <li>asdadsdasdasdasdasdasda</li>
              <li>asdsadasdasdada</li>
              <li>asdsadasdasdada</li>
              <li>asdsadasdasdada</li>
              <li>asdsadasdasdada</li>
              <li>asdsadasdasdada</li>
            </ul>
          </div>
          <button className="effect">UPGRADE</button>
        </div>
      ) : (
        <div className="cantUpgrade">
          <label>You do not have enough gems to upgrade this item.</label>
        </div>
      )}
    </>
  );
};

export default UpgradeNPC;
