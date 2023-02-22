import { toast } from "react-toastify";
import Cookies from "universal-cookie";

export const cookies = new Cookies();

export const headers = {
  "content-type": "application/json",
  Authorization: "Bearer " + cookies.get("token"),
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const notify = (alert) => {
  toast.error(alert, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifySuccess = (redirectTo, header, body1, body2, ...otherBodies) => {
  toast.success(
    <>
      <strong>{header}</strong>
      <br />
      {body1}
      <br />
      {body2}
      {otherBodies.map((body) => (
        <>
          <br />
          {body}
        </>
      ))}
    </>,
    {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
      className: "custom-success-toast",
    }
  );
};

export function dataTooltip(item) {
  let tooltip = `Name: ${capitalizeFirstLetter(item.name)}\n`;
  if (item.quality !== "") tooltip += `Quality: ${capitalizeFirstLetter(item.quality)}\n`;
  if (item.itemLevel > 0) tooltip += `Level: ${item.itemLevel}\n`;
  if (item.strength > 0) tooltip += `Strength: ${item.strength}\n`;
  if (item.dexterity > 0) tooltip += `Dexterity: ${item.dexterity}\n`;
  if (item.vitality > 0) tooltip += `Vitality: ${item.vitality}\n`;
  if (item.intelligence > 0) tooltip += `Intelligence: ${item.intelligence}\n`;
  if (item.luck > 0) tooltip += `Luck: ${item.luck}\n`;
  if (item.lvlMin > 0) tooltip += `Level Min: ${item.lvlMin}\n`;
  if (item.classRequired)
    tooltip += `Class: ${item.classRequired === "none" ? "All" : capitalizeFirstLetter(item.classRequired)}\n`;

  tooltip += `\nPrice: ${item.price.toLocaleString()}`;
  return tooltip;
}

export function sounds(sound) {
  const playSound = new Audio(require(`../components/sounds/${sound}.wav`));
  return playSound.play();
}
