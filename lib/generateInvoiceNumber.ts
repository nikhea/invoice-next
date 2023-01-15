export function uniqueNumber(count: any) {
  let defaultNumber = 4413277523420;
  let convertToArray = defaultNumber.toString().split("");
  let sliceNumber = convertToArray.slice(0, count);
  let randomNumber = Math.floor(Math.random() * +sliceNumber.join(""));

  if (randomNumber.toString().split("").length < count) {
    randomNumber = Math.abs(randomNumber - +sliceNumber.join(""));
  }

  return randomNumber;
}

export function generateRandomNumber() {
  let generateInvoiceNumber = uniqueNumber(5).toString();
  let invoiceId = `INV-${generateInvoiceNumber}`;
  return invoiceId;
}
