import sumArray from "./sumArray";

export default function campaignIsAvailable (campaign, basketItems) {
  const conditions = campaign.condition.split(",");
  const filters = campaign.filter.split(",");
  const filteredItems = basketItems.filter(item => {
    let result = true;
    for (let f of filters) {
      let [field, value] = [];
      if (f.includes("=")) {
        [field, value] = f.split("=");
        result = item[field] === value; 
      }
      if (!result) return false;
    }
    return true;
  });

  let isAvailable = false;
  for (let c of conditions) {
    // eslint-disable-next-line
    let [field, value] = [];
    if (c.includes("totalPrice")) {
      if (c.includes(">")) {
        // eslint-disable-next-line
        [field, value] = c.split(">");
        const totalPrice = sumArray(filteredItems, "subtotalPrice");
        if (totalPrice > value) {
          isAvailable = true;
          return { isAvailable, filteredItems };   
        }
      }
    }
  }
  return { isAvailable, filteredItems } ;
}