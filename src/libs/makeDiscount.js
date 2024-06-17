export default function makeDiscount(price, discount) {
  return discount ? price * (100 - discount) / 100 : price;
};