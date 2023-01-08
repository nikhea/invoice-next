import { FC } from "react";

interface senderProps {
  handlePrint: any;
}

const ItemsHeader: FC<senderProps> = ({ handlePrint }) => {
  return (
    <div className="  w-[80%] m-auto ">
        <div className="shadow-md bg-white  py-5 rounded my-5 flex items-center justify-between px-20">
        <button className="bg-green-500 py-3 px-3 capitalize text-white rounded" onClick={handlePrint}>print/download</button>
          <div>
            <button className="bg-orange-500 py-3 px-3 capitalize text-white rounded-[10%] mr-10  " onClick={handlePrint}>edit</button>
              <button className="bg-red-500 py-3 px-3 capitalize text-white rounded-[10%]" onClick={handlePrint}>delete</button>
                </div>
        </div>
     
    </div>
  );
};

export default ItemsHeader;