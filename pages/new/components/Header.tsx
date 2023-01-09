import { FC } from "react";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const style = {
  arrow: ` text-[50px] text-[#7c5dfa]  `,
};

const ItemsHeader: FC = () => {
  return (
    <div className="w-[90%] md:w-[80%]  m-auto ">
      <div className="shadow-md bg-white  py-5 rounded my-1 flex items-center justify-between px-10 md:px-20">
        <Link href="/invoice" className="arrow">
          <MdOutlineKeyboardArrowLeft className={style.arrow} />
          {/* <button className="bg-blue-500 py-3 px-3 capitalize text-white rounded-[10%]">
            go back
          </button> */}
        </Link>

        <div>
          <Link href="/preview">
            <button className="bg-blue-500 py-3 px-3 capitalize text-white rounded-[10%]">
              preview
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemsHeader;
