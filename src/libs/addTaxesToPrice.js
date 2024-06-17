export default function addTaxToPrice(unitPrice, taxes) {
  let totalTax = 0;
  taxes.forEach(tax => {
    totalTax += tax.amount
  });
  return unitPrice * (totalTax + 100) / 100;
}
