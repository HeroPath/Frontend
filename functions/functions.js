import { objectEmpty, orderEquipment } from "@/functions/constants";

export const orderedObject = (equipUser) => {
  const sortedItems = orderEquipment.map((itemType) => {
    const item = equipUser.items.find((item) => item.type === itemType);
    return item ? item : objectEmpty;
  });

  const updatedEquipUser = { ...equipUser, items: sortedItems };
  return updatedEquipUser;
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

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
