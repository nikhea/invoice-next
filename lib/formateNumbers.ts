// export const formatToCurrency = (amount: number): string => {
//   return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
// };
export const formatItemTotal = (price: number, quantity: number): string => {
  let total =(price * quantity)  
  return  numberWithCommas(total);
}
export const numberWithCommas = (x: any) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function calculateTotalAmount(items: { price: number, quantity: number }[]): number {
  let totalAmount = 0;
  for (const item of items) {
    totalAmount += item.price * item.quantity;
  }
  return numberWithCommas(totalAmount);
}

// const items = [
//   { price: 10, quantity: 2 },
//   { price: 5, quantity: 3 },
//   { price: 2, quantity: 5 },
// ];

// const totalAmount = calculateTotalAmount(items);
// console.log(totalAmount); 
