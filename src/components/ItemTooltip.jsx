import Typography from "@mui/material/Typography";
import "./itemTooltip.css";

const ItemTooltip = ({ item }) => {
  return (
    <div className="tooltipClass">
      <Typography className="itemTooltip--name mb-2">
        <label style={{ color: `${item.quality}` }}>{item.name}</label>
        <span>{item.itemLevel >= 1 ? ` +${item.itemLevel}` : ""}</span>
      </Typography>
      <div className="itemTooltip--stats">
        {item.strength > 0 && (
          <div className="tooltipStat">
            <label>Strength:</label>
            <span>{item.strength}</span>
          </div>
        )}
        {item.dexterity > 0 && (
          <div className="tooltipStat">
            <label>Dexterity:</label>
            <span>{item.dexterity}</span>
          </div>
        )}
        {item.intelligence > 0 && (
          <div className="tooltipStat">
            <label>Intelligence:</label>
            <span>{item.intelligence}</span>
          </div>
        )}
        {item.vitality > 0 && (
          <div className="tooltipStat">
            <label>Vitality:</label>
            <span>{item.vitality}</span>
          </div>
        )}
        {item.luck > 0 && (
          <div className="tooltipStat">
            <label>Luck:</label>
            <span>{item.luck}</span>
          </div>
        )}
        <div className="tooltipStat mt-1">
          <label>Level Req:</label>
          <span>{item.lvlMin}</span>
        </div>
        <div className="tooltipStat">
          <label>Class:</label>
          <span>{item.classRequired === "none" ? "All" : item.classRequired}</span>
        </div>
        <div className="tooltipStat mt-2">
          <label>Price:</label>
          <span>{item.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemTooltip;
