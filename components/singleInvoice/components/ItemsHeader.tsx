import router from "next/router";
import { FC } from "react";
import { deleteInvoices } from "../../../helper/invoicedata";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useInvoiceState } from "../../../store/useInvoiceStore";

interface senderProps {
  handlePrint: any;
  invoiceID: any;
}

const ItemsHeader: FC<senderProps> = ({ handlePrint, invoiceID }) => {
  // const [invoiceList, setInvoiceList] = useLocalStorage();
  const { removeFromInvoice } = useInvoiceState();
  const Ondelete = () => {
    // deleteInvoices(invoiceID, invoiceList, setInvoiceList);
    removeFromInvoice(invoiceID);
    router.push({ pathname: "/invoice" });
  };
  return (
    <div className="  w-[80%] m-auto ">
      {/* shadow-md bg-white */}
      <div className="flex items-center justify-between px-20 py-5 my-5 rounded ">
        <button
          className="px-3 py-3 text-white capitalize bg-green-500 rounded"
          onClick={handlePrint}
        >
          print/download
        </button>
        <div>
          {/* <button
            className="bg-orange-500 py-3 px-3 capitalize text-white rounded-[10%] mr-10  "
            onClick={handlePrint}
          >
            edit
          </button> */}
          <button
            className="bg-red-500 py-3 px-3 capitalize text-white rounded-[10%]"
            onClick={Ondelete}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsHeader;
