export default function makeDiscount(price, discount) {
  if (!discount) return price;
  if (discount.includes("%")) {
    return price * (100 - parseFloat(discount.replace("%", ""))) / 100;
  } else {
    return price - discount;
  }
};