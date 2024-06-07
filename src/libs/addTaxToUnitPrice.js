export default function addTaxToUnitPrice(product) {
  let totalTax = 0;
  totalTax += product.kdv ? product.kdv : 0;
  totalTax += product.otv ? product.otv : 0;
  totalTax += product.mtv ? product.mtv : 0;
  let price = product.price + (product.price * totalTax / 100);
  return price.toFixed(2);
}
