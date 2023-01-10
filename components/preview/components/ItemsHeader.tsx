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
      <div className="shadow-md bg-white  py-5 rounded my-1 flex items-center justify-between px-10 md:px-20">
        <Link href="/new" className="arrow">
          <MdOutlineKeyboardArrowLeft className={style.arrow} />
          {/* <button className="bg-blue-500 py-3 px-3 capitalize text-white rounded-[10%]">
            go back
          </button> */}
        </Link>

        <div>
          <button
            className="bg-green-500 py-3 px-3 capitalize text-white rounded"
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
