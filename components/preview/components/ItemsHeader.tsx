import { FC } from "react";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface senderProps {
  handlePrint: any;
}
const style = {
  arrow: ` text-[50px] text-[#7c5dfa]  `,
};

const ItemsHeader: FC<senderProps> = ({ handlePrint }) => {
  return (
    <div className="w-[90%] md:w-[80%]  m-auto ">
      {/* shadow-md bg-white */}
      <div className="flex items-center justify-between px-10 py-5 my-1 rounded md:px-20">
        <Link href="/new" className="arrow">
          <MdOutlineKeyboardArrowLeft className={style.arrow} />
          {/* <button className="bg-blue-500 py-3 px-3 capitalize text-white rounded-[10%]">
            go back
          </button> */}
        </Link>

        <div>
          <button
            className="px-3 py-3 text-white capitalize bg-green-500 rounded"
            onClick={handlePrint}
          >
            print/download
          </button>
          {/* <button className="bg-orange-500 py-3 px-3 capitalize text-white rounded-[10%] mr-10  " onClick={handlePrint}>edit</button> */}
        </div>
      </div>
    </div>
  );
};

export default ItemsHeader;
