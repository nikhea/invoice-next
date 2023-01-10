import { FC } from "react";
import {
  formatItemTotal,
  // numberWithCommas,
  formatToCurrency,
  calculateTotalAmount,
} from "../../../../lib/formateNumbers";
// import "./styleTable.module.css";
interface itemsProps {
  invoiceItems: any;
}
const ItemsTable: FC<itemsProps> = ({ invoiceItems }) => {
  return (
    <div>
      <table>
        <thead>
          <tr className="uppercase text-[#333b4d]">
            <th>description</th>
            <th>quantity</th>
            <th>price</th>
            <th>total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td> $ {formatToCurrency(item.price)}</td>
              <td>
                ${" "}
                {formatItemTotal(parseInt(item.price), parseInt(item.quantity))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className=" w-[100%] m-auto flex justify-between my-5 text-[#333b4d] border border-b-2 py-2 border-t-0 border-l-0 border-r-0">
        <h1 className="font-[500] text-2xl">Total</h1>
        <p className="font-[500] text-2xl">
          $ {calculateTotalAmount(invoiceItems)}
        </p>
      </div>
    </div>
  );
};
export default ItemsTable;
