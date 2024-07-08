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
    let [field, value] = [];
    if (c.includes("totalPrice")) {
      if (c.includes(">")) {
        [field, value] = c.split(">");
        const totalPrice = sumArray(filteredItems, field);
        if (totalPrice > value) {
          isAvailable = true;
          return { isAvailable, filteredItems };   
        }
      }
    }
  }
  return { isAvailable, filteredItems } ;
}