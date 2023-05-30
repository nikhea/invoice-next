export const formatToCurrency = (amount: any): any => {
  return parseInt(amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
export const formatItemTotal = (price: number, quantity: number): string => {
  let total = price * quantity;

  return formatToCurrency(total);
};
export const numberWithCommas = (x: any) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function calculateTotalAmount(
  items: { price: number; quantity: number }[]
): number | string | any {
  let totalAmount = 0;
  if (typeof items !== "undefined") {
    for (const item of items) {
      if (item.price && item.quantity) {
        //       total += quantity * price;
        totalAmount += item.price * item.quantity;
      }
    }
  }
  let amount = formatToCurrency(totalAmount);
  return amount;
}

// const items = [
//   { price: 10, quantity: 2 },
//   { price: 5, quantity: 3 },
//   { price: 2, quantity: 5 },
// ];

// const totalAmount = calculateTotalAmount(items);
// console.log(totalAmount);
