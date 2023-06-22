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

export function sounds(sound) {
  // const playSound = new Audio(require(`../public/sounds/${sound}.wav`));
  // return playSound.play();
}

export function sortedInventory(itemsUnsorted) {
  let items = itemsUnsorted.slice().sort((a, b) => (a.lvlMin > b.lvlMin ? 1 : -1));
  return { items };
}

export function countGemInventory(items) {
  const countGem = items.filter((item) => item.name === "progress gem").length;
  return countGem;
}
