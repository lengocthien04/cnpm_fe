
import { Dispatch, SetStateAction } from "react";

interface props {
  branch: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  printers: any[];
  setChosenPrinter: Dispatch<SetStateAction<string>>;
}

export default function Branch({ branch, printers, setChosenPrinter }: props) {



  return (
    <div className="w-full pt-[48px] px-[3rem]">
      <div className="relative mb-[48px] mr-[48px]">
        <p className="font-[inter] font-semibold text-[24px] leading-[28.8px] text-[#1E1E1E]">
          In ấn
        </p>
        <p className="font-[inter] font-normal text-[20px] leading-[24px] text-[#1E1E1E]">
          Cơ sở {branch}
        </p>
      </div>


      <div className="grid grid-cols-4 gap-6">
        {printers.map((printer) => (
          <div
            key={printer.id}
            className="relative col-span-1 p-[1.6rem] bg-[#60A3EF] mx-[8px] rounded-[8px]"
          >
            <p className="pt-[8px] pb-[16px] font-[inter] font-semibold text-[24px] leading-[28.8px] text-[#1E1E1E]">
              Máy {printer.index}
            </p>
            <p className="font-[inter] font-semibold text-[16px] leading-[22.4px] text-[#1E1E1E]">
              Địa điểm: {printer.location}
            </p>
            <p className="font-[inter] font-normal text-[16px] text-[#1E1E1E]">
              Hàng đợi: {printer.printjob_queue.length}
            </p>
            <p className=" pb-[16px] font-[inter] font-normal text-[16px] text-[#1E1E1E]">
              Status: {printer.status}
            </p>
            <button
              className=" px-[0.8rem] border border-solid border-black bg-[#4B4DD6] p-2  hover:bg-blue-100 hover:text-blue-300 rounded-md  text-white font-[inter] text-[20px]"
              onClick={() => setChosenPrinter(printer.id)}
            >
              Chọn
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
